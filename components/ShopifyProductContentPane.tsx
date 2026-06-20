import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { usePaneRouter } from "sanity/structure";
import { Box, Button, Card, Flex, Spinner, Stack, Text, TextInput } from "@sanity/ui";
import {
  fetchShopifyProducts,
  getShopifyEndpoint,
  type ShopifyProductOption,
} from "../lib/shopifyProducts";

interface ShopifyProductContentDoc {
  _id: string;
  handle?: string;
}

const API_VERSION = "2024-01-01";

function getDocumentId(handle: string) {
  return `shopifyProductContent.${handle}`;
}

export function ShopifyProductContentPane() {
  const client = useClient({ apiVersion: API_VERSION });
  const { navigateIntent } = usePaneRouter();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProductOption[]>([]);
  const [existingDocs, setExistingDocs] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canFetchProducts = Boolean(
    getShopifyEndpoint() && process.env.SANITY_STUDIO_SHOPIFY_STOREFRONT_TOKEN,
  );

  useEffect(() => {
    if (!canFetchProducts) {
      return;
    }

    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const [shopifyProducts, docs] = await Promise.all([
          fetchShopifyProducts(),
          client.fetch<ShopifyProductContentDoc[]>(
            `*[_type == "shopifyProductContent"]{_id, handle}`,
          ),
        ]);

        if (isCancelled) {
          return;
        }

        setProducts(shopifyProducts);
        setExistingDocs(
          Object.fromEntries(
            docs
              .filter((doc): doc is ShopifyProductContentDoc & { handle: string } =>
                Boolean(doc.handle),
              )
              .map((doc) => [doc.handle, doc._id]),
          ),
        );
      } catch (nextError) {
        if (!isCancelled) {
          setError(nextError instanceof Error ? nextError.message : "Unable to load Shopify products.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, [canFetchProducts, client]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      [product.title, product.handle, product.productType]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(normalizedQuery)),
    );
  }, [products, query]);

  async function openProduct(product: ShopifyProductOption) {
    const existingId = existingDocs[product.handle];

    if (existingId) {
      navigateIntent("edit", {
        id: existingId,
        type: "shopifyProductContent",
      });
      return;
    }

    const documentId = getDocumentId(product.handle);
    setActiveHandle(product.handle);

    try {
      await client.createIfNotExists({
        _id: documentId,
        _type: "shopifyProductContent",
        handle: product.handle,
        productTitle: product.title,
      });

      setExistingDocs((current) => ({
        ...current,
        [product.handle]: documentId,
      }));

      navigateIntent("edit", {
        id: documentId,
        type: "shopifyProductContent",
      });
    } finally {
      setActiveHandle(null);
    }
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="semibold">
            Shopify product content
          </Text>
          <Text size={1} muted>
            Live Shopify products are listed here automatically. Click a product to create or open its content document.
          </Text>
        </Stack>

        {canFetchProducts ? (
          <>
            <TextInput
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search Shopify products by title, handle, or type"
            />

            {isLoading ? (
              <Flex align="center" gap={2}>
                <Spinner muted />
                <Text size={1}>Loading Shopify products…</Text>
              </Flex>
            ) : error ? (
              <Card padding={3} radius={2} tone="critical" border>
                <Text size={1}>{error}</Text>
              </Card>
            ) : (
              <Stack space={2}>
                {filteredProducts.map((product) => {
                  const existingId = existingDocs[product.handle];
                  const isBusy = activeHandle === product.handle;

                  return (
                    <Card key={product.id} padding={3} radius={2} border>
                      <Flex align="center" justify="space-between" gap={3}>
                        <Stack space={2} flex={1}>
                          <Text size={1} weight="semibold">
                            {product.title}
                          </Text>
                          <Text size={1} muted>
                            {product.handle}
                            {product.productType ? ` · ${product.productType}` : ""}
                          </Text>
                        </Stack>

                        <Button
                          text={existingId ? "Edit content" : "Create content"}
                          tone={existingId ? "primary" : "default"}
                          loading={isBusy}
                          onClick={() => void openProduct(product)}
                        />
                      </Flex>
                    </Card>
                  );
                })}

                {!isLoading && filteredProducts.length === 0 ? (
                  <Text size={1} muted>
                    No Shopify products matched your search.
                  </Text>
                ) : null}
              </Stack>
            )}
          </>
        ) : (
          <Card padding={3} radius={2} border>
            <Text size={1} muted>
              Shopify listing is unavailable. Set `SANITY_STUDIO_SHOPIFY_STORE_DOMAIN` and
              `SANITY_STUDIO_SHOPIFY_STOREFRONT_TOKEN` for Studio to load live Shopify products automatically.
            </Text>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
