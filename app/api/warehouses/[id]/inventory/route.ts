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

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const inventories = await prisma.inventory.findMany({
      where: { warehouseId: id },
      include: { batch: { include: { product: true } }, warehouse: true }
    });

    const items = [];
    for (const inv of inventories) {
      const p = inv.batch.product;
      const available = (inv?.quantity || 0) - (inv?.reserved || 0);
      if (available <= 0) continue;
      const price = await getLatestPrice(p.id);
      items.push({
        productId: p.id,
        name: p.name,
        dosage: p.dosage,
        form: p.form,
        warehouseId: id,
        warehouseName: inv.warehouse.name,
        batchId: inv.batchId,
        lotNumber: inv.batch.lotNumber,
        expiryDate: inv.batch.expirationAt,
        stock: available,
        price,
      });
    }

    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to list warehouse inventory' }, { status: 500 });
  }
}
