import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { error: 'Please provide a valid contact number (e.g. +968 94009501).' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a detailed inquiry message.' },
        { status: 400 }
      );
    }

    // Sanitize values
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email ? String(email).trim() : 'Not provided';
    const cleanSubject = subject ? String(subject).trim() : 'General Inquiry';
    const cleanMessage = message.trim();

    // Prepare WhatsApp direct link fallback for immediate customer fulfillment
    const whatsappText = encodeURIComponent(
      `*svGulf Website Inquiry*\n\n` +
      `*Name:* ${cleanName}\n` +
      `*Phone:* ${cleanPhone}\n` +
      `*Email:* ${cleanEmail}\n` +
      `*Subject:* ${cleanSubject}\n` +
      `*Message:* ${cleanMessage}`
    );
    const whatsappUrl = `https://wa.me/96894009501?text=${whatsappText}`;

    // If Resend API Key is set in environment, optionally dispatch notification
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Smart Vision Gulf <inquiries@svgulf.com>',
            to: ['svgulfoman@gmail.com'],
            subject: `[svGulf Web] ${cleanSubject} - ${cleanName}`,
            text: `New customer inquiry:\nName: ${cleanName}\nPhone: ${cleanPhone}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\nMessage:\n${cleanMessage}`,
          }),
        });
      } catch (err) {
        console.error('[Contact API] Failed to send email via Resend:', err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully. Our team will contact you shortly.',
        whatsappFallback: whatsappUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Contact API] Error handling request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
