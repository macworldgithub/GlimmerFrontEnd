// app/sitemap.xml/route.ts
import { MetadataRoute } from "next";
import { BACKEND_URL, FRONTEND_URL } from "@/api/config";
import { getAllProductItem, getAllProducts } from "@/api/product";
import { escapeXml, extractCityFromAddress, formatSlug, sanitizeSlug } from "@/lib/utils";
import axios from "axios";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: FRONTEND_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  });

  urls.push({
    url: `${FRONTEND_URL}/selfcare-products`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  urls.push({
    url: `${FRONTEND_URL}/Blogs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  urls.push({
    url: `${FRONTEND_URL}/product_highlights`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  urls.push({
    url: `${FRONTEND_URL}/products`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  async function getAllSalonsDirect(page_no: number) {
  const res = await axios.get(
    `${BACKEND_URL}/salon/get-all-salon?page_no=${page_no}`
  );
  return res.data as { salons: any[]; total: number };
}

async function getAllActiveServicesDirect(salonId: string, page_no = 1) {
  const res = await axios.get(
    `${BACKEND_URL}/salon-services/getAllActiveServicesForWebiste?page_no=${page_no}&salonId=${salonId}`
  );
  return res.data; // depends on your API response shape
}

  try {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { salons, total } = await getAllSalonsDirect(page);

    for (const salon of salons) {
      // Generate city and salon slugs the same way frontend does
      const rawCity = extractCityFromAddress(salon.address);
      const citySlug = formatSlug(sanitizeSlug(rawCity));
      const salonSlug = formatSlug(sanitizeSlug(salon.salon_name));
      const openingSlug = formatSlug(sanitizeSlug(salon.openingHour));
      const closingSlug = formatSlug(sanitizeSlug(salon.closingHour));

      // Salon URL (with query params)
      const baseSalonUrl = `${FRONTEND_URL}/salons/${citySlug}/${salonSlug}?salonId=${salon._id}&openingHour=${openingSlug}&closingHour=${closingSlug}`;

      urls.push({
        url: baseSalonUrl,
        lastModified: new Date(
          salon.updated_at || salon.created_at || new Date()
        ),
        changeFrequency: "weekly",
        priority: 0.6,
      });

      // Services for this salon
      try {
  const servicesRes = await getAllActiveServicesDirect(String(salon._id));
  if (servicesRes?.services?.length) {
    for (const service of servicesRes.services) {
      if (service.name) {
        const serviceSlug = formatSlug(sanitizeSlug(service.name));

        const serviceUrl = `${FRONTEND_URL}/salons/${citySlug}/${salonSlug}/${serviceSlug}?serviceId=${service._id}&salonId=${salon._id}&openingHour=${openingSlug}&closingHour=${closingSlug}`;

        urls.push({
          url: serviceUrl,
          lastModified: new Date(
            service.updated_at || service.created_at || new Date()
          ),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      }
    }
  }
} catch (err) {
  console.error(`Error fetching services for salon ${salon._id}:`, err);
}

    }

    page++;
    hasMore = page * salons.length < total;
  }
} catch (err) {
  console.error("Error adding salons/services to sitemap:", err);
}

  // Products & categories
  try {
    const categories = await getAllProductItem();

    for (const cat of categories) {
      urls.push({
        url: `${FRONTEND_URL}/${cat.product_category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      for (const sub of cat.sub_categories) {
        urls.push({
          url: `${FRONTEND_URL}/${cat.product_category.slug}/${sub.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });

        for (const item of sub.items) {
          urls.push({
            url: `${FRONTEND_URL}/${cat.product_category.slug}/${sub.slug}/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });

          try {
            const res = await getAllProducts(
              cat.product_category.slug,
              sub.slug,
              item.slug,
              "",
              0,
              0,
              1,
              undefined,
              "desc",
              1000
            );

            if (res?.products?.length) {
              for (const product of res.products) {
                const categorySlug = sanitizeSlug(
                  product.category?.slug,
                  product.category?._id
                );
                const subCategorySlug = sanitizeSlug(
                  product.sub_category?.slug,
                  product.sub_category?._id
                );
                const itemSlug = product.item
                  ? sanitizeSlug(product.item?.slug, product.item?._id)
                  : undefined;

                const productSlug = product.name
                  ? formatSlug(product.name)
                  : product._id;

                const productPath = itemSlug
                  ? `/${categorySlug}/${subCategorySlug}/${itemSlug}/${productSlug}`
                  : `/${categorySlug}/${subCategorySlug}/${productSlug}`;

                const fullUrl = `${FRONTEND_URL}${productPath}?id=${product._id}&storeId=${product.store}`;

                urls.push({
                  url: fullUrl,
                  lastModified: new Date(
                    product.updated_at || product.created_at || new Date()
                  ),
                  changeFrequency: "weekly",
                  priority: 0.5,
                });
              }
            }
          } catch (err) {
            console.error("Error fetching products for sitemap:", err);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
  }

  // Return sitemap as XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u) => `<url>
  <loc>${escapeXml(u.url)}</loc>
  <lastmod>${(u.lastModified instanceof Date
    ? u.lastModified
    : new Date(u.lastModified ?? new Date())
  ).toISOString()}</lastmod>
  <changefreq>${u.changeFrequency}</changefreq>
  <priority>${u.priority}</priority>
</url>`
    )
    .join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
