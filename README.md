# CleenScore Waitlist – Starter

This is a ready-to-run Next.js + Tailwind project for the CleenScore waitlist landing page, with Privacy/Terms popups and a working form via **Formspree** (no backend needed).

## Quick start (your laptop)
1) Install Node (v18+). On Windows, install from https://nodejs.org
2) Open a terminal in this folder and run:
```
npm install
npm run dev
```
3) Visit http://localhost:3000

## Configure the form (Formspree)
1) Go to https://formspree.io
2) Create a form and copy your endpoint URL (looks like https://formspree.io/f/xxxx).
3) Open `app/page.tsx` and replace FORM_ENDPOINT with your endpoint.
4) Save. Refresh. Submit the form.

## Deploy to AWS Amplify (recommended)
See the guide in your ChatGPT message. Summary:
- Create a GitHub repo and push these files.
- In AWS Amplify → Hosting → Connect your repo.
- Add your domain if you have one.
- Done.
