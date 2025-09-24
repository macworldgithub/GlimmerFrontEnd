import { MetadataRoute } from "next";
import { getAllProductItem, getAllProducts } from "@/api/product";
import { fetchAllSalons, fetchSalonServices } from "@/api/salon";
import { BACKEND_URL } from "@/api/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: BACKEND_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  });

  urls.push({
    url: `${BACKEND_URL}/selfcare-products`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  urls.push({
    url: `${BACKEND_URL}/Blogs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  urls.push({
    url: `${BACKEND_URL}/product_highlights`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  urls.push({
    url: `${BACKEND_URL}/products`,
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
          const baseSalonUrl = `${BACKEND_URL}/${salon.city_slug}/${salon.salon_slug}`;

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

  let categories: any[] = [];
  try {
    categories = await getAllProductItem();
  } catch (err) {
    console.error("Error fetching categories:", err);
  }

  for (const cat of categories) {
    urls.push({
      url: `${BACKEND_URL}/${cat.product_category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    for (const sub of cat.sub_categories) {
      urls.push({
        url: `${BACKEND_URL}/${cat.product_category.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });

      for (const item of sub.items) {
        urls.push({
          url: `${BACKEND_URL}/${cat.product_category.slug}/${sub.slug}/${item.slug}`,
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
                url: `${BACKEND_URL}/${cat.product_category.slug}/${sub.slug}/${item.slug}/${product._id}`,
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

  return urls;
}
