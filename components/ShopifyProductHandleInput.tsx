import { useEffect, useMemo, useState } from "react";
import { set, unset, type StringInputProps } from "sanity";
import { Box, Button, Card, Flex, Spinner, Stack, Text, TextInput } from "@sanity/ui";
import {
  fetchShopifyProducts,
  getShopifyEndpoint,
  type ShopifyProductOption,
} from "../lib/shopifyProducts";

export function ShopifyProductHandleInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props;
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProductOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoint = getShopifyEndpoint();
  const canFetchProducts = Boolean(
    endpoint && process.env.SANITY_STUDIO_SHOPIFY_STOREFRONT_TOKEN,
  );

  useEffect(() => {
    if (!canFetchProducts) {
      return;
    }

    let isCancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        if (!isCancelled) {
          setProducts(await fetchShopifyProducts());
        }
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

    void loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [canFetchProducts]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products.slice(0, 12);
    }

    return products
      .filter((product) =>
        [product.title, product.handle, product.productType]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(normalizedQuery)),
      )
      .slice(0, 12);
  }, [products, query]);

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        value={value || ""}
        onChange={(event) =>
          onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset())
        }
      />

      <Card padding={3} radius={2} tone="transparent" border>
        <Stack space={3}>
          <Text size={1} muted>
            Search live Shopify products and click one to fill the handle field. Manual handles still work.
          </Text>

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
                <Text size={1} tone="critical">
                  {error}
                </Text>
              ) : filteredProducts.length > 0 ? (
                <Stack space={2}>
                  {filteredProducts.map((product) => {
                    const isSelected = value === product.handle;

                    return (
                      <Button
                        key={product.id}
                        mode={isSelected ? "default" : "ghost"}
                        tone={isSelected ? "primary" : "default"}
                        text={`${product.title} (${product.handle})`}
                        onClick={() => onChange(set(product.handle))}
                      />
                    );
                  })}
                </Stack>
              ) : (
                <Text size={1} muted>
                  No Shopify products matched your search.
                </Text>
              )}
            </>
          ) : (
            <Box>
              <Text size={1} muted>
                Shopify picker is unavailable. Set `SANITY_STUDIO_SHOPIFY_STORE_DOMAIN` and
                `SANITY_STUDIO_SHOPIFY_STOREFRONT_TOKEN` for Studio to load live Shopify products.
              </Text>
            </Box>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
