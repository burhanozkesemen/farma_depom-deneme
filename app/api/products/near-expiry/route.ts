import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// Utility: get latest price for a product
async function getLatestPrice(productId: string) {
  const price = await prisma.price.findFirst({
    where: { productId },
    orderBy: [{ validFrom: 'desc' }],
  });
  return price?.basePrice ? Number(price?.basePrice || 0) : null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    const days = Number.parseInt(daysParam ?? '60', 10);
    const safeDays = Number.isFinite(days) ? days : 60;
    const now = new Date();
    const until = new Date(now);
    until.setDate(until.getDate() + safeDays);

    const batches = await prisma.batch.findMany({
      where: { expirationAt: { lte: until } },
      include: {
        product: { include: { manufacturer: true, barcodes: true } },
        inventories: { include: { warehouse: true } },
      },
      orderBy: { expirationAt: 'asc' }
    });

    const items = [];
    for (const b of batches) {
      for (const inv of b.inventories) {
        const available = (inv?.quantity || 0) - (inv?.reserved || 0);
        if (available <= 0) continue;
        const price = await getLatestPrice(b.productId);
        items.push({
          productId: b.productId,
          name: b.product.name,
          dosage: b.product.dosage,
          form: b.product.form,
          barcode: b.product.barcodes[0]?.code ?? null,
          warehouseId: inv.warehouseId,
          warehouseName: inv.warehouse.name,
          expiryDate: b.expirationAt,
          stock: available,
          price,
        });
      }
    }

    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to list near-expiry products' }, { status: 500 });
  }
}
