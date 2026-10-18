import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/serverStore';
import { getInitialStoreData } from '@/data/seedData';
import { StoreData } from '@/lib/adminTypes';

export async function GET() {
  try {
    const data = await getStoreData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve site data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
      const imported: StoreData = {
        products: body.data.products,
        blogs: body.data.blogs,
        theme: body.data.theme || (await getStoreData()).theme,
        inquiries: body.data.inquiries || (await getStoreData()).inquiries,
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
