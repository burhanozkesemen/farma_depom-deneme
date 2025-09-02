import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        category: true,
        barcodes: true,
        prices: { orderBy: [{ validFrom: 'desc' }], take: 5 },
        batches: {
          include: {
            inventories: { include: { warehouse: true } }
          }
        }
      }
    });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Convert Decimal fields in prices
    const prices = product.prices.map(pr => ({
      ...pr,
      basePrice: Number(pr?.basePrice || 0)
    }));

    return NextResponse.json({ ...product, prices });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to get product' }, { status: 500 });
  }
}
