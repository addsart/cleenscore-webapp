import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      full_name = "",
      country = "",
      referral_code = "",
      consent = false,
      utm_source = "",
      utm_medium = "",
      utm_campaign = "",
      utm_content = "",
      utm_term = "",
    } = body || {};

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, error: "Consent required" }, { status: 400 });
    }

    // Supabase (server-side) - uses Service Role
    const SUPABASE_URL = process.env.SUPABASE_URL!;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await sb.from("waitlist").insert([{
      email,
      full_name,
      country,
      referral_code,
      source: utm_source || null,
      medium: utm_medium || null,
      campaign: utm_campaign || null,
      content: utm_content || null,
      term: utm_term || null,
      consent: !!consent,
    }]);
    if (error && error.code !== "23505") { // ignore duplicate email
      return NextResponse.json({ ok: false, error: "DB insert failed" }, { status: 500 });
    }

    // Send welcome email with WorkMail SMTP via Nodemailer
    const {
      WORKMAIL_SMTP_HOST,
      WORKMAIL_SMTP_PORT,
      WORKMAIL_USER,
      WORKMAIL_PASS,
      FROM_EMAIL, // e.g., 'CleenScore <info@cleenscore.com>'
    } = process.env as Record<string, string>;

    if (!WORKMAIL_SMTP_HOST || !WORKMAIL_SMTP_PORT || !WORKMAIL_USER || !WORKMAIL_PASS || !FROM_EMAIL) {
      // Don’t fail signup if email not configured; just return success for now.
      return NextResponse.json({ ok: true, message: "Joined waitlist (email not configured)" }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: WORKMAIL_SMTP_HOST,           // e.g. smtp.mail.eu-west-1.awsapps.com
      port: Number(WORKMAIL_SMTP_PORT),   // 465 (SSL) or 587 (STARTTLS)
      secure: Number(WORKMAIL_SMTP_PORT) === 465, // true for 465, false for 587
      auth: { user: WORKMAIL_USER, pass: WORKMAIL_PASS },
    });

    const html = `
      <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.5;color:#111">
        <h2>Welcome to CleenScore 🎉</h2>
        <p>Hi${full_name ? " " + full_name : ""},</p>
        <p>Thanks for joining the CleenScore waitlist. You’ll be among the first to get early access.</p>
        <p>What to expect next:</p>
        <ul>
          <li>Early beta invites</li>
          <li>Progress updates</li>
          <li>Perks for early supporters</li>
        </ul>
        <p>— Team CleenScore</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="font-size:12px;color:#666">
          AddsArt Ltd (CleenScore is a trading name), United Kingdom.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "You're on the CleenScore waitlist 🎉",
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
