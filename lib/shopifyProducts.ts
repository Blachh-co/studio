function buildShopifyStorefrontEndpoint(storeDomain: string) {
  return `https://${storeDomain}/api/2024-10/graphql.json`;
}

export interface ShopifyProductOption {
  id: string;
  handle: string;
  title: string;
  productType: string;
}

interface ShopifyProductsResponse {
  products: {
    nodes: ShopifyProductOption[];
  };
}

export function getShopifyEndpoint() {
  const storeDomain = process.env.SANITY_STUDIO_SHOPIFY_STORE_DOMAIN;

  if (!storeDomain) {
    return null;
  }

  return buildShopifyStorefrontEndpoint(storeDomain);
}

export async function fetchShopifyProducts(): Promise<ShopifyProductOption[]> {
  const endpoint = getShopifyEndpoint();
  const storefrontToken = process.env.SANITY_STUDIO_SHOPIFY_STOREFRONT_TOKEN;

  if (!endpoint || !storefrontToken) {
    throw new Error(
      "Set SANITY_STUDIO_SHOPIFY_STORE_DOMAIN and SANITY_STUDIO_SHOPIFY_STOREFRONT_TOKEN to enable Shopify product loading in Studio.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({
      query: `
        query StudioShopifyProducts {
          products(first: 50) {
            nodes {
              id
              handle
              title
              productType
            }
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as {
    data?: ShopifyProductsResponse;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((item) => item.message).join(", "));
  }

  if (!payload.data?.products?.nodes) {
    throw new Error("Shopify response did not include products.");
  }

  return payload.data.products.nodes;
}
