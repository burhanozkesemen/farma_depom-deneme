import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    // Load all categories once
    const all = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    // Group by parentId
    const byParent = new Map();
    for (const c of all) {
      const key = c.parentId || 'root';
      if (!byParent.has(key)) byParent.set(key, []);
      byParent.get(key).push({ id: c.id, name: c.name, parentId: c.parentId });
    }

    // Build tree recursively
    const build = (node: any): any => {
      const children = byParent.get(node.id) || [];
      return {
        id: node.id,
        name: node.name,
        children: children.map(build),
      };
    };

    const roots = byParent.get('root') || [];
    const tree = roots.map(build);
    return NextResponse.json(tree);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to list categories' }, { status: 500 });
  }
}
