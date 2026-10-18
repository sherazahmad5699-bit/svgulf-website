import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  verifyAdminCredentials, 
  generateAdminSessionToken, 
  verifyAdminSessionToken 
} from '@/lib/serverStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const token = generateAdminSessionToken(username);

    // Set HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set('svgulf_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({
      success: true,
      user: {
        username: 'admin',
        name: 'svGulf Admin Manager',
        role: 'superadmin',
      },
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('svgulf_admin_session')?.value;
  const authHeader = request.headers.get('authorization')?.replace('Bearer ', '');
  const token = sessionToken || authHeader;

  if (verifyAdminSessionToken(token)) {
    return NextResponse.json({
      authenticated: true,
      user: {
        username: 'admin',
        name: 'svGulf Admin Manager',
        role: 'superadmin',
      },
    });
  }

  return NextResponse.json(
    { authenticated: false },
    { status: 401 }
  );
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.set('svgulf_admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
