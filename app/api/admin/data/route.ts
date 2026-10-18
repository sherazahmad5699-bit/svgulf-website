import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData, isRequestAuthorized } from '@/lib/serverStore';
import { getInitialStoreData } from '@/data/seedData';
import { StoreData } from '@/lib/adminTypes';

export async function GET(request: Request) {
  try {
    const data = await getStoreData();
    const authorized = isRequestAuthorized(request);

    if (authorized) {
      return NextResponse.json(data);
    }

    // Public catalog response (omits sensitive customer inquiries and admin secrets)
    return NextResponse.json({
      products: data.products,
      blogs: data.blogs,
      theme: data.theme,
      inquiries: [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve site data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (body.action === 'reset') {
      const initial = getInitialStoreData();
      await saveStoreData(initial);
      return NextResponse.json({
        success: true,
        message: 'Store reset to initial factory seed data.',
        data: initial,
      });
    }

    if (body.data && Array.isArray(body.data.products) && Array.isArray(body.data.blogs)) {
      const current = await getStoreData();
      const imported: StoreData = {
        products: body.data.products,
        blogs: body.data.blogs,
        theme: body.data.theme || current.theme,
        inquiries: body.data.inquiries || current.inquiries,
      };
      await saveStoreData(imported);
      return NextResponse.json({
        success: true,
        message: 'Store data imported successfully.',
        data: imported,
      });
    }

    return NextResponse.json(
      { error: 'Invalid payload format for import.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update store data.' },
      { status: 500 }
    );
  }
}
