import { NextResponse } from 'next/server';
import { getProducts, saveProduct, deleteProduct } from '@/lib/serverStore';
import { Product } from '@/lib/adminTypes';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get('sku');
    const products = await getProducts();

    if (sku) {
      const match = products.find((p) => p.sku === sku);
      if (!match) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(match);
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const product: Product = await request.json();

    if (!product.sku || !product.name || !product.priceNumeric) {
      return NextResponse.json(
        { error: 'SKU, name, and price are required fields.' },
        { status: 400 }
      );
    }

    // Auto-format price if not formatted
    if (!product.priceFormatted) {
      product.priceFormatted = `OMR ${Number(product.priceNumeric).toFixed(3)}`;
    }

    const saved = await saveProduct(product);
    return NextResponse.json({
      success: true,
      message: 'Product saved successfully.',
      product: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save product.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let sku = searchParams.get('sku');

    if (!sku) {
      const body = await request.json().catch(() => ({}));
      sku = body.sku;
    }

    if (!sku) {
      return NextResponse.json(
        { error: 'Product SKU is required for deletion.' },
        { status: 400 }
      );
    }

    const deleted = await deleteProduct(sku);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Product SKU not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Product ${sku} deleted successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product.' },
      { status: 500 }
    );
  }
}
