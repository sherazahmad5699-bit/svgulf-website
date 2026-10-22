import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/serverStore';

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const store = await getStoreData();
    const products = store.products || [];

    const baseUrl = 'https://svgulf.com';

    const itemsXml = products
      .map((product) => {
        const itemUrl = `${baseUrl}/inventory/${product.sku}`;
        const imageUrl = product.image.startsWith('http')
          ? product.image
          : `${baseUrl}${product.image}`;

        const conditionMapping =
          product.condition === 'Brand New' ? 'new' : 'refurbished';

        return `    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description || `${product.brandLabel} ${product.cpu} ${product.ram} ${product.ssd}`)}</g:description>
      <g:link>${escapeXml(itemUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:condition>${conditionMapping}</g:condition>
      <g:availability>${product.inStock !== false ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${product.priceNumeric.toFixed(3)} OMR</g:price>
      <g:brand>${escapeXml(product.brandLabel)}</g:brand>
      <g:product_type>Electronics &gt; Computers &gt; Laptops</g:product_type>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
      })
      .join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Smart Vision Gulf - Certified Enterprise Laptops Oman</title>
    <link>${baseUrl}</link>
    <description>Google Merchant Center product catalog for Smart Vision Gulf (Shop 10, Ghala Heights, Muscat, Oman). Grade A++ verified laptops with 6-month warranty.</description>
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error generating feed', { status: 500 });
  }
}
