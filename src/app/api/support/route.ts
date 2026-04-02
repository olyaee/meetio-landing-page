import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SupportBody {
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: SupportBody = await request.json();

    if (!body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await resend.emails.send({
      from: "meetio <noreply@notifications.meetio.ai>",
      to: "founders@meetio.ai",
      replyTo: body.email,
      subject: `[Support] ${body.subject}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 500px;">
          <h2 style="margin-bottom: 16px;">Support Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; width: 80px;">From</td><td style="padding: 8px 0;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Subject</td><td style="padding: 8px 0;">${body.subject}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-radius: 8px; white-space: pre-wrap;">${body.message}</div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Support request error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
