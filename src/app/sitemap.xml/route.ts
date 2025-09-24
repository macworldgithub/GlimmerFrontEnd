// app/sitemap.xml/route.ts
import { MetadataRoute } from "next";
import { FRONTEND_URL, BACKEND_URL } from "@/api/config";
import { fetchAllSalons, fetchSalonServices } from "@/api/salon";
import { getAllProductItem, getAllProducts } from "@/api/product";

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

  try {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { salons, totalPages } = await fetchAllSalons(page);

      for (const salon of salons) {
        if (salon.city_slug && salon.salon_slug) {
          const baseSalonUrl = `${FRONTEND_URL}/${salon.city_slug}/${salon.salon_slug}`;

          urls.push({
            url: baseSalonUrl,
            lastModified: new Date(
              salon.updated_at || salon.created_at || new Date()
            ),
            changeFrequency: "weekly",
            priority: 0.6,
          });

          urls.push({
            url: `${baseSalonUrl}/services`,
            lastModified: new Date(
              salon.updated_at || salon.created_at || new Date()
            ),
            changeFrequency: "weekly",
            priority: 0.6,
          });

          try {
            const services = await fetchSalonServices(salon._id);

            for (const service of services) {
              if (service.slug) {
                urls.push({
                  url: `${baseSalonUrl}/${service.slug}`,
                  lastModified: new Date(
                    service.updated_at || service.created_at || new Date()
                  ),
                  changeFrequency: "weekly",
                  priority: 0.5,
                });
              }
            }
          } catch (err) {
            console.error(
              `Error fetching services for salon ${salon._id}:`,
              err
            );
          }
        }
      }

      page++;
      hasMore = page <= totalPages;
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
                urls.push({
                  url: `${FRONTEND_URL}/${cat.product_category.slug}/${sub.slug}/${item.slug}/${product._id}`,
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
  <loc>${u.url}</loc>
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
