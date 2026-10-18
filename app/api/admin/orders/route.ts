import { NextResponse } from 'next/server';
import { getInquiries, addInquiry, updateInquiry, deleteInquiry } from '@/lib/serverStore';

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required.' },
        { status: 400 }
      );
    }

    const created = await addInquiry({
      name: body.name,
      phone: body.phone,
      email: body.email,
      subject: body.subject || 'General Inquiry',
      message: body.message,
      productSku: body.productSku,
      productName: body.productName,
      source: body.source || 'contact_form',
      status: 'new',
      notes: body.notes || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry recorded successfully.',
      inquiry: created,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to record inquiry.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    const updated = await updateInquiry(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated.',
      inquiry: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    const deleted = await deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
