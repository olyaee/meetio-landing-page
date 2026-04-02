import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface DemoRequestBody {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: DemoRequestBody = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Send notification to founders
    await resend.emails.send({
      from: "meetio <noreply@notifications.meetio.ai>",
      to: "founders@meetio.ai",
      replyTo: body.email,
      subject: `New demo request from ${body.name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 500px;">
          <h2 style="margin-bottom: 16px;">New Demo Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; width: 80px;">Name</td><td style="padding: 8px 0;">${body.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
            ${body.company ? `<tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0;">${body.company}</td></tr>` : ""}
            ${body.message ? `<tr><td style="padding: 8px 0; color: #888;">Message</td><td style="padding: 8px 0;">${body.message}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    // Send auto-reply to user
    await resend.emails.send({
      from: "meetio <noreply@notifications.meetio.ai>",
      to: body.email,
      replyTo: "founders@meetio.ai",
      subject: `Thanks for your interest, ${body.name}!`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 500px;">
          <h2>Thanks for reaching out!</h2>
          <p>Hi ${body.name},</p>
          <p>We received your demo request and will get back to you within 24 hours.</p>
          <p>In the meantime, you can try our Chrome extension:</p>
          <p><a href="https://chromewebstore.google.com/detail/meetio/pdgedjihhemnhfocoogmhpnehcpeclfb" style="color: #111; font-weight: 600;">Install meetio for Chrome</a></p>
          <p style="color: #888; margin-top: 24px;">— The meetio team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json({ error: "Failed to send request" }, { status: 500 });
  }
}
