/*
 Seed script: Turkish pharmacy sample data
 Run: npm run db:seed
*/

import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

const prisma = new PrismaClient()

async function main() {
  // Pharmacy and Warehouse
  const pharmacy = await prisma.pharmacy.upsert({
    where: { id: 'pharmacy-demo-1' },
    update: {},
    create: {
      id: 'pharmacy-demo-1',
      name: 'Demo Eczanesi',
      gln: 'ECZ-0001',
      city: 'İstanbul',
      country: 'TR',
    },
  })

  const warehouse = await prisma.warehouse.upsert({
    where: { id: 'warehouse-demo-1' },
    update: {},
    create: {
      id: 'warehouse-demo-1',
      name: 'Merkez Depo',
      city: 'İstanbul',
      country: 'TR',
      pharmacy: { connect: { id: pharmacy.id } },
    },
  })

  // Manufacturers
  const manuWorld = await prisma.manufacturer.upsert({
    where: { name: 'World Medicine' },
    update: {},
    create: { name: 'World Medicine', country: 'TR' },
  })
  const manuAbdi = await prisma.manufacturer.upsert({
    where: { name: 'Abdi İbrahim' },
    update: {},
    create: { name: 'Abdi İbrahim', country: 'TR' },
  })
  const manuSanofi = await prisma.manufacturer.upsert({
    where: { name: 'Sanofi' },
    update: {},
    create: { name: 'Sanofi', country: 'FR' },
  })

  // Categories (hierarchy: Ağrı -> Analjezik; Enfeksiyon -> Antibiyotik; Vitamin)
  const catPain = await prisma.category.upsert({
    where: { id: 'cat-pain' },
    update: {},
    create: { id: 'cat-pain', name: 'Ağrı' },
  })
  const catAnalgesic = await prisma.category.upsert({
    where: { id: 'cat-analgesic' },
    update: {},
    create: { id: 'cat-analgesic', name: 'Analjezik', parent: { connect: { id: catPain.id } } },
  })
  const catInfection = await prisma.category.upsert({
    where: { id: 'cat-infection' },
    update: {},
    create: { id: 'cat-infection', name: 'Enfeksiyon' },
  })
  const catAntibiotic = await prisma.category.upsert({
    where: { id: 'cat-antibiotic' },
    update: {},
    create: { id: 'cat-antibiotic', name: 'Antibiyotik', parent: { connect: { id: catInfection.id } } },
  })
  const catVitamin = await prisma.category.upsert({
    where: { id: 'cat-vitamin' },
    update: {},
    create: { id: 'cat-vitamin', name: 'Vitamin' },
  })

  // CSV category: Sindirim
  const catDigestive = await prisma.category.upsert({
    where: { id: 'cat-digestive' },
    update: {},
    create: { id: 'cat-digestive', name: 'Sindirim' },
  })

  // Products
  const products = [
    {
      id: 'parol-500mg-20',
      name: 'Parol 500 mg 20 Tablet',
      dosage: '500 mg',
      form: 'Tablet',
      imageUrl: null,
      manufacturerId: manuAbdi.id,
      categoryId: catAnalgesic.id,
      prescription: 'Reçetesiz',
      barcodes: ['8699514090013'],
      price: '74.90',
      batches: [
        { lot: 'P501', exp: addMonths(12), qty: 120 },
        { lot: 'P502', exp: addMonths(24), qty: 80 },
      ],
    },
    {
      id: 'majezik-100mg-20',
      name: 'Majezik 100 mg 20 Tablet',
      dosage: '100 mg',
      form: 'Tablet',
      imageUrl: null,
      manufacturerId: manuSanofi.id,
      categoryId: catAnalgesic.id,
      prescription: 'Reçetesiz',
      barcodes: ['8699543090001'],
      price: '159.90',
      batches: [
        { lot: 'M101', exp: addMonths(10), qty: 60 },
      ],
    },
    {
      id: 'arveles-25mg-20',
      name: 'Arveles 25 mg 20 Tablet',
      dosage: '25 mg',
      form: 'Tablet',
      imageUrl: null,
      manufacturerId: manuWorld.id,
      categoryId: catAnalgesic.id,
      prescription: 'Reçetesiz',
      barcodes: ['8699543090025'],
      price: '184.90',
      batches: [
        { lot: 'A251', exp: addMonths(18), qty: 75 },
      ],
    },
    {
      id: 'augmentin-625mg-14',
      name: 'Augmentin 625 mg 14 Tablet',
      dosage: '625 mg',
      form: 'Tablet',
      imageUrl: null,
      manufacturerId: manuSanofi.id,
      categoryId: catAntibiotic.id,
      prescription: 'Beyaz Reçete',
      barcodes: ['8699543090062'],
      price: '329.90',
      batches: [
        { lot: 'AGM1', exp: addMonths(8), qty: 40 },
      ],
    },
    {
      id: 'devit3-300000iu-ampul',
      name: 'Devit-3 300.000 IU 1 Ampul',
      dosage: '300000 IU',
      form: 'Ampul',
      imageUrl: null,
      manufacturerId: manuAbdi.id,
      categoryId: catVitamin.id,
      prescription: 'Beyaz Reçete',
      barcodes: ['8699514090556'],
      price: '219.90',
      batches: [
        { lot: 'DV301', exp: addMonths(20), qty: 30 },
      ],
    },
  ]

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        dosage: p.dosage,
        form: p.form,
        imageUrl: p.imageUrl ?? null,
        manufacturerId: p.manufacturerId,
        categoryId: p.categoryId,
        prescription: p.prescription,
      },
      create: {
        id: p.id,
        name: p.name,
        dosage: p.dosage,
        form: p.form,
        imageUrl: p.imageUrl ?? null,
        manufacturerId: p.manufacturerId,
        categoryId: p.categoryId,
        prescription: p.prescription,
      },
    })

    // barcodes
    for (const code of p.barcodes) {
      await prisma.barcode.upsert({
        where: { code },
        update: { productId: product.id },
        create: { code, productId: product.id },
      })
    }

    // price (simple current price)
    await prisma.price.upsert({
      where: { id: `${product.id}-price` },
      update: { basePrice: p.price },
      create: { id: `${product.id}-price`, productId: product.id, basePrice: p.price },
    })

    // batches + inventory
    for (const b of p.batches) {
      const batch = await prisma.batch.upsert({
        where: { id: `${product.id}-${b.lot}` },
        update: { expirationAt: b.exp },
        create: {
          id: `${product.id}-${b.lot}`,
          productId: product.id,
          lotNumber: b.lot,
          expirationAt: b.exp,
        },
      })

      await prisma.inventory.upsert({
        where: { warehouseId_batchId: { warehouseId: warehouse.id, batchId: batch.id } },
        update: { quantity: b.qty },
        create: {
          warehouseId: warehouse.id,
          batchId: batch.id,
          quantity: b.qty,
          reserved: 0,
        },
      })
    }
  }

  // --- CSV import: categories/*.csv ---
  const categoriesDir = path.resolve(process.cwd(), 'categories')
  if (process.env.USE_FLAT_CATEGORIES === '1' && fs.existsSync(categoriesDir)) {
    const files = fs
      .readdirSync(categoriesDir)
      .filter((f) => f.toLowerCase().endsWith('.csv'))

    let totalImported = 0
    let fileCount = 0

    for (const file of files) {
      const categoryName = path.basename(file, path.extname(file)).trim()
      const categoryId = `cat-${slugify(categoryName).slice(0, 60)}`
      const category = await prisma.category.upsert({
        where: { id: categoryId },
        update: { name: categoryName },
        create: { id: categoryId, name: categoryName },
      })

      const filePath = path.join(categoriesDir, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const records = parse(raw, { columns: true, skip_empty_lines: true })

      let imported = 0
      for (const row of records) {
        const name = safeTrim(row['urun_ismi'])
        if (!name) continue

        const manufacturerName = safeTrim(row['ilac_sirketi']) || 'Bilinmeyen'
        const prescription = safeTrim(row['recete_tipi']) || null
        const barcode = safeTrim(row['barkod']) || null
        const imageUrl = firstNonEmpty(
          safeTrim(row['img_url']), // added alias
          safeTrim(row['resim_url']),
          safeTrim(row['resim']),
          safeTrim(row['gorsel']),
          safeTrim(row['görsel']),
          safeTrim(row['image_url']),
          safeTrim(row['image'])
        )
        // Allow header aliases: kamu_odenen | kamu_ode, etken_madde | etken_mac
        const kamuOdenenRaw = firstNonEmpty(row['kamu_odenen'], row['kamu_ode'])
        const etkenMaddeRaw = firstNonEmpty(row['etken_madde'], row['etken_mac'])
        const psf = trPriceToDecimal(
          firstNonEmpty(row['psf'], row['dsf'], kamuOdenenRaw, row['fiyat_farki'])
        )

        // Upsert manufacturer
        const manufacturer = await prisma.manufacturer.upsert({
          where: { name: manufacturerName },
          update: {},
          create: { name: manufacturerName, country: 'TR' },
        })

        // Derive dosage/form from name (best-effort)
        const { dosage, form } = deriveDosageAndForm(name)

        // Deterministic product id from category + name
        const productId = `csv-${slugify(categoryName).slice(0, 24)}-${slugify(name).slice(0, 36)}`

        const product = await prisma.product.upsert({
          where: { id: productId },
          update: {
            name,
            dosage,
            form,
            imageUrl,
            manufacturerId: manufacturer.id,
            categoryId: category.id,
            prescription,
          },
          create: {
            id: productId,
            name,
            dosage,
            form,
            imageUrl,
            manufacturerId: manufacturer.id,
            categoryId: category.id,
            prescription,
          },
        })

        // Barcode unique
        if (barcode) {
          await prisma.barcode.upsert({
            where: { code: barcode },
            update: { productId: product.id },
            create: { code: barcode, productId: product.id },
          })
        }

        // Price (use psf if available)
        if (psf) {
          await prisma.price.upsert({
            where: { id: `${product.id}-price-csv` },
            update: { basePrice: psf },
            create: { id: `${product.id}-price-csv`, productId: product.id, basePrice: psf },
          })
        }

        // Minimal stock: one batch and inventory for visibility
        const batchId = `${product.id}-CSV1`
        const batch = await prisma.batch.upsert({
          where: { id: batchId },
          update: { expirationAt: addMonths(18) },
          create: {
            id: batchId,
            productId: product.id,
            lotNumber: 'CSV1',
            expirationAt: addMonths(18),
          },
        })

        await prisma.inventory.upsert({
          where: { warehouseId_batchId: { warehouseId: warehouse.id, batchId: batch.id } },
          update: { quantity: 25 },
          create: { warehouseId: warehouse.id, batchId: batch.id, quantity: 25, reserved: 0 },
        })

        imported++
      }
      totalImported += imported
      fileCount++
      console.log(`Imported ${imported} products from ${file} into category '${categoryName}'.`)
    }
    console.log(`Categories import completed: ${totalImported} rows across ${fileCount} files.`)
  } else {
    console.log('Flat categories import disabled or categories/ directory not found, skipping flat import.')
  }

  // --- NEW hierarchical mapping: new_data/categories/{Group}/{Category}/alt guruplar/*.csv ---
  const newDataRoot = path.resolve(process.cwd(), 'new_data', 'categories')
  if (fs.existsSync(newDataRoot)) {
    console.log('Processing hierarchical categories from new_data/categories ...')
    const keepIds = new Set()
    const groupDirs = fs.readdirSync(newDataRoot).filter((d) =>
      fs.statSync(path.join(newDataRoot, d)).isDirectory()
    )

    for (const groupName of groupDirs) {
      const groupPath = path.join(newDataRoot, groupName)
      const groupCategory = await prisma.category.upsert({
        where: { id: `grp-${slugify(groupName).slice(0, 60)}` },
        update: { name: groupName },
        create: { id: `grp-${slugify(groupName).slice(0, 60)}`, name: groupName },
      })
      keepIds.add(groupCategory.id)

      const mainCategoryDirs = fs.readdirSync(groupPath).filter((d) =>
        fs.statSync(path.join(groupPath, d)).isDirectory()
      )

      for (const mainName of mainCategoryDirs) {
        const mainPath = path.join(groupPath, mainName)
        const mainCategory = await prisma.category.upsert({
          where: { id: `cat-${slugify(groupName)}-${slugify(mainName)}` },
          update: { name: capitalize(mainName), parentId: groupCategory.id },
          create: {
            id: `cat-${slugify(groupName)}-${slugify(mainName)}`,
            name: capitalize(mainName),
            parentId: groupCategory.id,
          },
        })
        keepIds.add(mainCategory.id)

        // 1) Main CSV(ler): Tam satırlardan ürün oluştur/güncelle ve ana kategoriye ata
        // Ayrıca barcode -> row indekslemesi yap (alt gruplar barcode-only dosyaları için)
        const mainIndex = new Map() // barcode -> parsed row
        const topCsvFiles = fs
          .readdirSync(mainPath)
          .filter((f) => f.toLowerCase().endsWith('.csv'))
        for (const topCsv of topCsvFiles) {
          const filePath = path.join(mainPath, topCsv)
          const raw = fs.readFileSync(filePath, 'utf8')
          const records = parse(raw, { columns: true, skip_empty_lines: true })

          let upserts = 0, skipped = 0
          for (const row of records) {
            const name = safeTrim(row['urun_ismi'])
            if (!name) { skipped++; continue }
            const manufacturerName = safeTrim(row['ilac_sirketi']) || 'Bilinmeyen'
            const prescription = safeTrim(row['recete_tipi']) || null
            const barcode = safeTrim(row['barkod']) || null
            const imageUrl = firstNonEmpty(
              safeTrim(row['img_url']),
              safeTrim(row['resim_url']),
              safeTrim(row['resim']),
              safeTrim(row['gorsel']),
              safeTrim(row['görsel']),
              safeTrim(row['image_url']),
              safeTrim(row['image'])
            )
            const kamuOdenenRaw = firstNonEmpty(row['kamu_odenen'], row['kamu_ode'])
            const psf = trPriceToDecimal(
              firstNonEmpty(row['psf'], row['dsf'], kamuOdenenRaw, row['fiyat_farki'])
            )

            // Manufacturer
            const manufacturer = await prisma.manufacturer.upsert({
              where: { name: manufacturerName },
              update: {},
              create: { name: manufacturerName, country: 'TR' },
            })

            // Dosage/Form
            const { dosage, form } = deriveDosageAndForm(name)

            // Product target: if barcode mapped to an existing product, update it; else create a new product id
            let targetProductId = null
            if (barcode) {
              const bc = await prisma.barcode.findUnique({ where: { code: barcode } })
              if (bc) targetProductId = bc.productId
            }
            if (!targetProductId) {
              targetProductId = `csv-${slugify(groupName).slice(0, 12)}-${slugify(mainName).slice(0, 12)}-${slugify(name).slice(0, 32)}`
            }

            await prisma.product.upsert({
              where: { id: targetProductId },
              update: {
                name,
                dosage,
                form,
                imageUrl,
                manufacturerId: manufacturer.id,
                categoryId: mainCategory.id,
                prescription,
              },
              create: {
                id: targetProductId,
                name,
                dosage,
                form,
                imageUrl,
                manufacturerId: manufacturer.id,
                categoryId: mainCategory.id,
                prescription,
              },
            })

            if (barcode) {
              await prisma.barcode.upsert({
                where: { code: barcode },
                update: { productId: targetProductId },
                create: { code: barcode, productId: targetProductId },
              })
              mainIndex.set(barcode, { row, productId: targetProductId })
            }

            if (psf) {
              await prisma.price.upsert({
                where: { id: `${targetProductId}-price-csv` },
                update: { basePrice: psf },
                create: { id: `${targetProductId}-price-csv`, productId: targetProductId, basePrice: psf },
              })
            }

            // Ensure visibility: one batch and inventory
            const batchId = `${targetProductId}-CSV1`
            const batch = await prisma.batch.upsert({
              where: { id: batchId },
              update: { expirationAt: addMonths(18) },
              create: { id: batchId, productId: targetProductId, lotNumber: 'CSV1', expirationAt: addMonths(18) },
            })
            await prisma.inventory.upsert({
              where: { warehouseId_batchId: { warehouseId: warehouse.id, batchId: batch.id } },
              update: { quantity: 25 },
              create: { warehouseId: warehouse.id, batchId: batch.id, quantity: 25, reserved: 0 },
            })

            upserts++
          }
          console.log(`  [${groupName}/${mainName}] upserted ${upserts} products from top CSV '${topCsv}', skipped(no name): ${skipped}`)
        }

        // 2) Alt gruplar: sadece barkod listeleri -> mevcut ürünü alt kategoriye taşı
        // Eğer ürün henüz yoksa ama barkod mainIndex'te varsa, önce ürünü oluştur, sonra ata
        // Find subgroups dir (case-insensitive match for 'alt guruplar')
        const subDirName = fs
          .readdirSync(mainPath)
          .find((n) => fs.statSync(path.join(mainPath, n)).isDirectory() && n.toLowerCase() === 'alt guruplar')

        if (subDirName) {
          const subDirPath = path.join(mainPath, subDirName)
          const subCsvs = fs.readdirSync(subDirPath).filter((f) => f.toLowerCase().endsWith('.csv'))
          for (const subCsv of subCsvs) {
            const subName = path.basename(subCsv, path.extname(subCsv)).trim()
            const subCategory = await prisma.category.upsert({
              where: { id: `sub-${slugify(groupName)}-${slugify(mainName)}-${slugify(subName)}` },
              update: { name: subName, parentId: mainCategory.id },
              create: {
                id: `sub-${slugify(groupName)}-${slugify(mainName)}-${slugify(subName)}`,
                name: subName,
                parentId: mainCategory.id,
              },
            })
            keepIds.add(subCategory.id)

            const filePath = path.join(subDirPath, subCsv)
            const raw = fs.readFileSync(filePath, 'utf8')
            const records = parse(raw, { columns: true, skip_empty_lines: true })

            let matched = 0, createdFromMain = 0, missing = 0
            for (const row of records) {
              const barcode = safeTrim(row['barkod'])
              if (!barcode) { missing++; continue }
              const bc = await prisma.barcode.findUnique({ where: { code: barcode } })
              if (bc) {
                await prisma.product.update({ where: { id: bc.productId }, data: { categoryId: subCategory.id } })
                matched++
              } else {
                const cached = mainIndex.get(barcode)
                if (cached) {
                  const r = cached.row
                  const name = safeTrim(r['urun_ismi'])
                  const manufacturerName = safeTrim(r['ilac_sirketi']) || 'Bilinmeyen'
                  const prescription = safeTrim(r['recete_tipi']) || null
                  const imageUrl = firstNonEmpty(
                    safeTrim(r['img_url']),
                    safeTrim(r['resim_url']),
                    safeTrim(r['resim']),
                    safeTrim(r['gorsel']),
                    safeTrim(r['görsel']),
                    safeTrim(r['image_url']),
                    safeTrim(r['image'])
                  )
                  const kamuOdenenRaw = firstNonEmpty(r['kamu_odenen'], r['kamu_ode'])
                  const psf = trPriceToDecimal(
                    firstNonEmpty(r['psf'], r['dsf'], kamuOdenenRaw, r['fiyat_farki'])
                  )

                  const manufacturer = await prisma.manufacturer.upsert({
                    where: { name: manufacturerName },
                    update: {},
                    create: { name: manufacturerName, country: 'TR' },
                  })
                  const { dosage, form } = deriveDosageAndForm(name)

                  const productId = cached.productId || `csv-${slugify(groupName).slice(0, 12)}-${slugify(mainName).slice(0, 12)}-${slugify(name).slice(0, 32)}`
                  await prisma.product.upsert({
                    where: { id: productId },
                    update: {
                      name,
                      dosage,
                      form,
                      imageUrl,
                      manufacturerId: manufacturer.id,
                      categoryId: subCategory.id,
                      prescription,
                    },
                    create: {
                      id: productId,
                      name,
                      dosage,
                      form,
                      imageUrl,
                      manufacturerId: manufacturer.id,
                      categoryId: subCategory.id,
                      prescription,
                    },
                  })
                  await prisma.barcode.upsert({
                    where: { code: barcode },
                    update: { productId },
                    create: { code: barcode, productId },
                  })
                  if (psf) {
                    await prisma.price.upsert({
                      where: { id: `${productId}-price-csv` },
                      update: { basePrice: psf },
                      create: { id: `${productId}-price-csv`, productId, basePrice: psf },
                    })
                  }
                  // Ensure visibility
                  const batchId = `${productId}-CSV1`
                  const batch = await prisma.batch.upsert({
                    where: { id: batchId },
                    update: { expirationAt: addMonths(18) },
                    create: { id: batchId, productId, lotNumber: 'CSV1', expirationAt: addMonths(18) },
                  })
                  await prisma.inventory.upsert({
                    where: { warehouseId_batchId: { warehouseId: warehouse.id, batchId: batch.id } },
                    update: { quantity: 25 },
                    create: { warehouseId: warehouse.id, batchId: batch.id, quantity: 25, reserved: 0 },
                  })
                  createdFromMain++
                } else {
                  missing++
                }
              }
            }
            console.log(`  [${groupName}/${mainName}] subgroup '${subCategory.name}': assigned ${matched}, createdFromMain ${createdFromMain}, missing: ${missing}`)
          }
        }
      }
    }

    // Enforce special rule: Sindirim > Mide > A02 Grubu
    const sindirimNode = await prisma.category.findFirst({ where: { name: 'Sindirim' } })
    if (sindirimNode) {
      const mideNode = await prisma.category.findFirst({ where: { name: 'Mide', parentId: sindirimNode.id } })
      if (mideNode) {
        const a02 = await prisma.category.upsert({
          where: { id: `sub-${slugify('A grubu')}-${slugify('Sindirim')}-${slugify('A02 Grubu')}` },
          update: { name: 'A02 Grubu', parentId: mideNode.id },
          create: { id: `sub-${slugify('A grubu')}-${slugify('Sindirim')}-${slugify('A02 Grubu')}`, name: 'A02 Grubu', parentId: mideNode.id },
        })
        keepIds.add(a02.id)
        // Move any products that remain on 'Mide' to 'A02 Grubu'
        const mideProducts = await prisma.product.findMany({ where: { categoryId: mideNode.id }, select: { id: true } })
        if (mideProducts.length) {
          for (const mp of mideProducts) {
            await prisma.product.update({ where: { id: mp.id }, data: { categoryId: a02.id } })
          }
          console.log(`Moved ${mideProducts.length} products from 'Mide' to 'A02 Grubu'.`)
        }
      }
    }

    // Cleanup: remove categories not present in new_data-derived set, only if leaf and productless
    const allCats = await prisma.category.findMany({ include: { children: true, products: true } })
    let deleted = 0
    for (const c of allCats) {
      if (keepIds.has(c.id)) continue
      const hasChildren = (c.children?.length ?? 0) > 0
      const hasProducts = (c.products?.length ?? 0) > 0
      if (!hasChildren && !hasProducts) {
        await prisma.category.delete({ where: { id: c.id } })
        deleted++
      }
    }
    console.log(`Cleanup removed ${deleted} categories not present in new_data (leaf and productless).`)
  } else {
    console.log('new_data/categories directory not found, skipping hierarchical mapping.')
  }

  // --- Canonical category tree (final structure) [optional via USE_CANONICAL=1] ---
  if (process.env.USE_CANONICAL === '1') {
    console.log('Applying canonical category structure...')
    const canonical = {
      roots: [
        { id: 'hematolojik-ajan', name: 'Hematolojik Ajan' },
        { id: 'sinir-sistemi', name: 'Sinir Sistemi' },
        { id: 'enfeksiyon', name: 'Enfeksiyon' },
        { id: 'sindirim', name: 'Sindirim' },
        { id: 'kalp-damar', name: 'Kalp & Damar' },
        { id: 'antineoplastik-immu', name: 'Antineoplastik & İmmünomodülatör' },
        { id: 'solunum', name: 'Solunum' },
        { id: 'diger-ilaclar', name: 'Diğer İlaçlar' },
        { id: 'kas-eklem', name: 'Kas & Eklem' },
        { id: 'dermatoloji', name: 'Dermatoloji' },
        { id: 'cinsel-saglik', name: 'Cinsel Sağlık' },
        { id: 'goz-kulak-sagligi', name: 'Göz & Kulak Sağlığı' },
        { id: 'hormon-metabolizma', name: 'Hormon & Metabolizma' },
        { id: 'antiparaziter', name: 'Antiparaziter' },
      ],
      sindirimSubs: [
        { id: 'sindirim-diyabet', name: 'Diyabet' },
        { id: 'sindirim-mide', name: 'Mide' },
        { id: 'sindirim-vitamin', name: 'Vitamin' },
        { id: 'sindirim-fonksiyonel-gi', name: 'Fonksiyonel Gastrointestinal' },
        { id: 'sindirim-mineral', name: 'Mineral' },
        { id: 'sindirim-bulanti-kusma', name: 'Bulantı & Kusma' },
        { id: 'sindirim-kabizlik', name: 'Kabızlık' },
        { id: 'sindirim-ishal', name: 'İshal' },
        { id: 'sindirim-agiz-sagligi', name: 'Ağız Sağlığı' },
        { id: 'sindirim-diger', name: 'Diğer Sindirim & Metabolizma' },
        { id: 'sindirim-safra-karaciger', name: 'Safra Kesesi & Karaciğer' },
        { id: 'sindirim-sindirim', name: 'Sindirim' },
        { id: 'sindirim-obezite', name: 'Obezite' },
        { id: 'sindirim-anabolik', name: 'Anabolik' },
      ],
      mideChildren: [
        { id: 'sindirim-mide-a02', name: 'A02 Grubu' },
      ],
    }

    // Upsert roots
    const rootByName = new Map()
    for (const r of canonical.roots) {
      const cat = await prisma.category.upsert({
        where: { id: r.id },
        update: { name: r.name, parentId: null },
        create: { id: r.id, name: r.name },
      })
      rootByName.set(r.name.toLowerCase(), cat)
    }

    // Upsert Sindirim children under root 'sindirim'
    const sindirimRoot = await prisma.category.findUnique({ where: { id: 'sindirim' } })
    if (sindirimRoot) {
      const sindirimChildByName = new Map()
      for (const sc of canonical.sindirimSubs) {
        const child = await prisma.category.upsert({
          where: { id: sc.id },
          update: { name: sc.name, parentId: sindirimRoot.id },
          create: { id: sc.id, name: sc.name, parentId: sindirimRoot.id },
        })
        sindirimChildByName.set(sc.name.toLowerCase(), child)
      }
      // Mide -> A02 Grubu
      const mide = await prisma.category.findFirst({ where: { name: 'Mide', parentId: sindirimRoot.id } })
      if (mide) {
        for (const mc of canonical.mideChildren) {
          await prisma.category.upsert({
            where: { id: mc.id },
            update: { name: mc.name, parentId: mide.id },
            create: { id: mc.id, name: mc.name, parentId: mide.id },
          })
        }
        // Move all products that remain on 'Mide' to 'A02 Grubu'
        const a02 = await prisma.category.findUnique({ where: { id: 'sindirim-mide-a02' } })
        if (a02) {
          const mideProducts = await prisma.product.findMany({ where: { categoryId: mide.id }, select: { id: true } })
          for (const mp of mideProducts) {
            await prisma.product.update({ where: { id: mp.id }, data: { categoryId: a02.id } })
          }
          console.log(`Moved ${mideProducts.length} products from 'Mide' to 'A02 Grubu'.`)
        }
      }
    }

    // Re-map products to canonical ids by exact name match
    const allCanonicalNames = new Map([
      ...canonical.roots.map(r => [r.name.toLowerCase(), r.id]),
      ...canonical.sindirimSubs.map(s => [s.name.toLowerCase(), s.id]),
      ...canonical.mideChildren.map(m => [m.name.toLowerCase(), m.id]),
    ])

    const productsWithCat = await prisma.product.findMany({ include: { category: true } })
    let reassigned = 0
    for (const p of productsWithCat) {
      const currentName = p.category?.name?.toLowerCase()
      if (!currentName) continue
      const targetId = allCanonicalNames.get(currentName)
      if (targetId && p.categoryId !== targetId) {
        await prisma.product.update({ where: { id: p.id }, data: { categoryId: targetId } })
        reassigned++
      }
    }
    console.log(`Reassigned ${reassigned} products to canonical categories by name.`)

    // Cleanup: delete categories not in canonical set if leaf and productless
    const keepIdsCanonical = new Set([
      ...canonical.roots.map(r => r.id),
      ...canonical.sindirimSubs.map(s => s.id),
      ...canonical.mideChildren.map(m => m.id),
    ])
    const allCatsCanonical = await prisma.category.findMany({ include: { children: true, products: true } })
    let deletedCanonical = 0
    for (const c of allCatsCanonical) {
      if (keepIdsCanonical.has(c.id)) continue
      const hasChildren = c.children && c.children.length > 0
      const hasProducts = c.products && c.products.length > 0
      if (!hasChildren && !hasProducts) {
        await prisma.category.delete({ where: { id: c.id } })
        deletedCanonical++
      }
    }
    console.log(`Canonical cleanup removed ${deletedCanonical} stray categories (no children, no products).`)
  } // end USE_CANONICAL

  // Hard purge helper to delete products not in a set of category ids
  async function purgeToNewData(prisma, keepCategoryIds) {
    // Products outside keep set
    const products = await prisma.product.findMany({
      where: { OR: [ { categoryId: null }, { categoryId: { notIn: Array.from(keepCategoryIds) } } ] },
      select: { id: true }
    })
    const pids = products.map(p => p.id)
    if (pids.length) {
      // order items referencing these products
      await prisma.orderItem.deleteMany({ where: { productId: { in: pids } } })
      // batches and their inventories
      const batches = await prisma.batch.findMany({ where: { productId: { in: pids } }, select: { id: true } })
      const bids = batches.map(b => b.id)
      if (bids.length) {
        await prisma.inventory.deleteMany({ where: { batchId: { in: bids } } })
        await prisma.orderItem.updateMany({ where: { batchId: { in: bids } }, data: { batchId: null } })
        await prisma.batch.deleteMany({ where: { id: { in: bids } } })
      }
      await prisma.price.deleteMany({ where: { productId: { in: pids } } })
      await prisma.barcode.deleteMany({ where: { productId: { in: pids } } })
      await prisma.product.deleteMany({ where: { id: { in: pids } } })
      console.log(`Purged ${pids.length} products not mapped from new_data.`)
    }

    // Remove categories not in keep set by repeatedly deleting leaves
    let deletedLoop = 0
    for (;;) {
      const candidates = await prisma.category.findMany({
        where: { id: { notIn: Array.from(keepCategoryIds) } },
        include: { children: true, products: true }
      })
      const leaves = candidates.filter(c => (c.children?.length ?? 0) === 0 && (c.products?.length ?? 0) === 0)
      if (!leaves.length) break
      await prisma.category.deleteMany({ where: { id: { in: leaves.map(l => l.id) } } })
      deletedLoop += leaves.length
    }
    if (deletedLoop) console.log(`Purged ${deletedLoop} categories outside new_data.`)

    // Remove orphan manufacturers (no products)
    const orphanManus = await prisma.manufacturer.findMany({ include: { products: true } })
    const orphanIds = orphanManus.filter(m => (m.products?.length ?? 0) === 0).map(m => m.id)
    if (orphanIds.length) {
      await prisma.manufacturer.deleteMany({ where: { id: { in: orphanIds } } })
      console.log(`Removed ${orphanIds.length} orphan manufacturers.`)
    }
  }

  if (process.env.PURGE_TO_NEW_DATA === '1') {
    await purgeToNewData(prisma, keepIds)
  }

  console.log('Seed completed.')
}

function addMonths(m) {
  const d = new Date()
  d.setMonth(d.getMonth() + m)
  return d
}

function safeTrim(v) {
  return typeof v === 'string' ? v.trim() : v
}

function firstNonEmpty(...args) {
  for (const a of args) {
    if (a && String(a).trim().length > 0) return a
  }
  return null
}

function trPriceToDecimal(text) {
  if (!text) return null
  // Examples: "173,32 TL", "151,63 TL", "106,61 TL"
  const cleaned = String(text).replace(/TL/gi, '').replace(/\s+/g, '').replace(/\./g, '').replace(',', '.')
  const num = Number.parseFloat(cleaned)
  if (!Number.isFinite(num)) return null
  // Prisma Decimal accepts string
  return num.toFixed(2)
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function deriveDosageAndForm(name) {
  const n = name.toLowerCase()
  let form = null
  if (n.includes('tablet')) form = 'Tablet'
  else if (n.includes('kapsül') || n.includes('kapsul')) form = 'Kapsül'
  else if (n.includes('saşe') || n.includes('sase')) form = 'Saşe'
  else if (n.includes('oral damla') || n.includes('damla')) form = 'Damla'
  else if (n.includes('sprey')) form = 'Sprey'
  else if (n.includes('likit') || n.includes('çözelti') || n.includes('cozelti')) form = 'Likit'
  else if (n.includes('jel')) form = 'Jel'
  else if (n.includes('gargara')) form = 'Gargara'

  const dosageMatch = name.match(/(\d+[\.,]?\d*\s*(mg|ml|iu|gr|mcg))/i)
  const dosage = dosageMatch ? dosageMatch[0].replace(',', '.') : null
  return { dosage, form }
}

function capitalize(str) {
  if (!str) return str
  const s = String(str)
  return s.charAt(0).toUpperCase() + s.slice(1)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
