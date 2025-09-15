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
      return NextResponse.json({ ok: false, stage: "validate", error: "Invalid email" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, stage: "validate", error: "Consent required" }, { status: 400 });
    }

    // --- Supabase insert (server-side with Service Role) ---
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: false, stage: "env", error: "SUPABASE env vars missing" }, { status: 500 });
    }

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await sb.from("waitlist").insert([{
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

    // If duplicate, treat as success for UX; otherwise bubble error
    if (dbError && dbError.code !== "23505") {
      console.error("DB insert error:", dbError);
      return NextResponse.json({ ok: false, stage: "db", error: dbError.message || "DB insert failed" }, { status: 500 });
    }

    // --- Email (non-blocking) ---
    const {
      WORKMAIL_SMTP_HOST,
      WORKMAIL_SMTP_PORT = "587",
      WORKMAIL_USER,
      WORKMAIL_PASS,
      FROM_EMAIL,
    } = process.env as Record<string, string | undefined>;

    let emailStatus: "sent" | "skipped" | "failed" = "skipped";
    let emailError: string | undefined;

    if (WORKMAIL_SMTP_HOST && WORKMAIL_USER && WORKMAIL_PASS && FROM_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          host: WORKMAIL_SMTP_HOST,                 // e.g. smtp.mail.eu-west-1.awsapps.com
          port: Number(WORKMAIL_SMTP_PORT),         // 587 STARTTLS (recommended) or 465 SSL
          secure: Number(WORKMAIL_SMTP_PORT) === 465, // true for 465, false for 587
          auth: { user: WORKMAIL_USER, pass: WORKMAIL_PASS },
          // STARTTLS hint for port 587
          tls: Number(WORKMAIL_SMTP_PORT) === 587 ? { rejectUnauthorized: true, ciphers: "TLSv1.2" } : undefined,
        });

        const html = `
          <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.5;color:#111">
            <h2>Welcome to CleenScore 🎉</h2>
            <p>Hi${full_name ? " " + full_name : ""},</p>
            <p>Thanks for joining the CleenScore waitlist. You will be among the first to get early access.</p>
            <p>— Team CleenScore</p>
          </div>
        `;

        await transporter.sendMail({
          from: FROM_EMAIL,               // e.g. 'CleenScore <info@cleenscore.com>'
          to: email,
          subject: "You are on the CleenScore waitlist",
          html,
        });

        emailStatus = "sent";
      } catch (e: any) {
        console.error("Email error:", e);
        emailStatus = "failed";
        emailError = e?.message || "Email send failed";
        // Do NOT fail the whole request because email failed
      }
    }

    return NextResponse.json({ ok: true, stage: "done", emailStatus, emailError }, { status: 200 });
  } catch (e: any) {
    console.error("Unhandled error:", e);
    return NextResponse.json({ ok: false, stage: "unhandled", error: e?.message || "Server error" }, { status: 500 });
  }
}
