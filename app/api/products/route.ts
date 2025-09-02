import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// Utility: get latest price for a product
async function getLatestPrice(productId: string) {
  const price = await prisma.price.findFirst({
    where: { productId },
    orderBy: [{ validFrom: 'desc' }],
  });
  // Convert Prisma Decimal to number if present
  return price?.basePrice ? Number(price?.basePrice || 0) : null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const limit = Math.min(Math.max(parseInt(limitParam ?? '50', 10), 1), 200);
    const offset = Math.max(parseInt(offsetParam ?? '0', 10), 0);

    const [total, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        skip: offset,
        take: limit,
        orderBy: { name: 'asc' },
        include: { barcodes: true, manufacturer: true }
      })
    ]);

    const items = [];
    for (const p of products) {
      const batches = await prisma.batch.findMany({ where: { productId: p.id }, select: { id: true } });
      const batchIds = batches.map(b => b.id);
      let stock = 0;
      if (batchIds.length) {
        const inventories = await prisma.inventory.findMany({ where: { batchId: { in: batchIds } } });
        stock = inventories.reduce((acc, i) => acc + (i?.quantity || 0) - (i?.reserved || 0), 0);
      }
      const price = await getLatestPrice(p.id);
      items.push({
        id: p.id,
        name: p.name,
        dosage: p.dosage,
        form: p.form,
        manufacturer: p.manufacturer?.name ?? null,
        barcode: p.barcodes[0]?.code ?? null,
        stock,
        price,
        imageUrl: p?.imageUrl ?? null,
      });
    }

    return NextResponse.json({ items, total });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to list products' }, { status: 500 });
  }
}
