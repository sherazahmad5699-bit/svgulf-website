import { NextResponse } from 'next/server';
import { getTheme, saveTheme } from '@/lib/serverStore';
import { ThemeSettings } from '@/lib/adminTypes';

export async function GET() {
  try {
    const theme = await getTheme();
    return NextResponse.json(theme);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve theme settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: ThemeSettings = await request.json();
    const updated = await saveTheme(body);
    return NextResponse.json({
      success: true,
      message: 'Theme settings updated successfully.',
      theme: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update theme settings.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return PUT(request);
}
