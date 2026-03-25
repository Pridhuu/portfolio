import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const data = await req.json();

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: '04pridhuraj@gmail.com',
            subject: 'New Contact Form Message',
            html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Email failed' }, { status: 500 });
    }
}