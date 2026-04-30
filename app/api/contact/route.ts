import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Escape HTML to prevent user input from breaking the email template
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, message } = body;

        // Log incoming data for debugging
        console.log("📩 Contact form received:", { name, email, phone, message: message?.substring(0, 50) });

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Escape all user inputs for safe HTML embedding
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || "");
        const safeMessage = escapeHtml(message);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email to you (the portfolio owner)
        const ownerResult = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Message from ${safeName}`,
            text: `New Contact Request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #FF5C00; margin-bottom: 24px;">New Contact Request</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; color: #888; width: 120px; vertical-align: top; font-size: 14px;">Name</td>
                            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #888; vertical-align: top; font-size: 14px;">Email</td>
                            <td style="padding: 12px 0; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #FF5C00;">${safeEmail}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #888; vertical-align: top; font-size: 14px;">Phone</td>
                            <td style="padding: 12px 0; font-size: 14px;">${safePhone || "—"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #888; vertical-align: top; font-size: 14px;">Message</td>
                            <td style="padding: 12px 0; white-space: pre-line; font-size: 14px; line-height: 1.6;">${safeMessage}</td>
                        </tr>
                    </table>
                    <hr style="border: none; border-top: 1px solid #eee; margin-top: 32px;" />
                    <p style="color: #aaa; font-size: 12px; margin-top: 16px;">Sent from your portfolio contact form</p>
                </div>
            `,
        });

        console.log("✅ Owner email sent:", ownerResult.messageId);

        // Auto-reply to the sender
        const replyResult = await transporter.sendMail({
            from: `"Rakib Hasan" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Thanks for reaching out!",
            text: `Hey ${name}!\n\nThanks for your message! I've received it and will get back to you as soon as possible.\n\n— Rakib Hasan`,
            html: `
                <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #FF5C00;">Hey ${safeName} 👋</h2>
                    <p style="font-size: 15px; line-height: 1.6;">Thanks for your message! I've received it and will get back to you as soon as possible.</p>
                    <p style="color: #888; margin-top: 32px; font-size: 13px;">— Rakib Hasan</p>
                </div>
            `,
        });

        console.log("✅ Auto-reply sent:", replyResult.messageId);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("❌ Contact email error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to send email. Please try again." },
            { status: 500 }
        );
    }
}
