import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Normalize a TL string like "1.234,56 TL", "Ödenmez", "-" to number or null
function parseTL(input: unknown): number | null {
  if (input == null) return null;
  const raw = String(input).trim();
  if (!raw || raw === '-' || /ödenmez/i.test(raw)) return null;
  // Remove TL and spaces
  let s = raw.replace(/\s*TL/i, '').replace(/\s+/g, '');
  // Remove thousand separators (.) then replace decimal comma with dot
  s = s.replace(/\./g, '').replace(/,/g, '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function pickPrice(rec: Record<string, any>): number | null {
  // Prefer PSF, then Kamu Ödenen, then DSF, then Fiyat Farki
  const candidates = [rec?.psf, rec?.kamu_odenen, rec?.dsf, rec?.fiyat_farki];
  for (const c of candidates) {
    const v = parseTL(c);
    if (v != null && v > 0) return v;
  }
  // Allow zero as fallback if present
  for (const c of candidates) {
    const v = parseTL(c);
    if (v === 0) return 0;
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const q = searchParams.get('q')?.toLowerCase().trim();

    const limit = Math.min(Math.max(parseInt(limitParam ?? '50', 10), 1), 200);
    const offset = Math.max(parseInt(offsetParam ?? '0', 10), 0);

    const csvPath = path.join(process.cwd(), 'Diğer İlaçlar.csv');
    const csvBuffer = await fs.readFile(csvPath);

    // Parse CSV with header row
    const records = parse(csvBuffer, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
      relax_column_count: true,
      bom: true,
      delimiter: ',',
      trim: true,
    }) as Record<string, any>[];

    // Normalize keys we care about
    let items = records
      .map((rec, idx) => {
        const name = rec?.urun_ismi || rec?.['urun_ismi'] || rec?.['ürün_ismi'] || '';
        const imageUrl = rec?.img_url || null;
        const manufacturer = rec?.ilac_sirketi || null;
        const barcode = rec?.barkod || null;
        const prescriptionType = rec?.recete_tipi || null;
        const ingredient = rec?.etken_madde || null;
        const price = pickPrice(rec);

        return {
          id: barcode || String(idx + 1),
          name,
          manufacturer,
          barcode,
          prescriptionType,
          ingredient,
          price,
          imageUrl: imageUrl || '/api/placeholder/280/280',
        };
      })
      // Drop empty rows (some rows are headers/notes in the CSV)
      .filter((p) => p.name && typeof p.name === 'string' && p.name.length > 1);

    if (q) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.manufacturer?.toLowerCase().includes(q)) ||
        (p.barcode?.toString().includes(q))
      );
    }

    const total = items.length;
    const paged = items.slice(offset, offset + limit);

    return NextResponse.json({ items: paged, total });
  } catch (e) {
    console.error('csv-products GET error', e);
    return NextResponse.json({ error: 'Failed to read CSV products' }, { status: 500 });
  }
}
