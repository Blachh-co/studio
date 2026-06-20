import { defineArrayMember, defineField, defineType } from "sanity";
import { ShopifyProductHandleInput } from "../../components/ShopifyProductHandleInput";

export const shopifyProductContent = defineType({
  name: "shopifyProductContent",
  title: "Shopify product content",
  type: "document",
  groups: [
    { name: "identity", title: "Identity" },
    { name: "tabs", title: "Tabs" },
    { name: "rating", title: "Ratings" },
    { name: "summary", title: "Review Summary" },
    { name: "reviews", title: "Reviews" },
  ],
  fields: [
    defineField({
      name: "handle",
      title: "Shopify handle",
      type: "string",
      group: "identity",
      description: "Must exactly match the Shopify product handle used in the URL.",
      components: {
        input: ShopifyProductHandleInput,
      },
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9-]+$/, {
          name: "lowercase handle",
        }),
    }),
    defineField({
      name: "productTitle",
      title: "Product title reference",
      type: "string",
      group: "identity",
      description: "Editor-facing helper only. This does not affect the frontend.",
    }),
    defineField({
      name: "tabs",
      title: "Product tabs",
      type: "object",
      group: "tabs",
      description:
        "Optional product-specific sections such as Description, Brewing notes, Storage, or any custom tab. Leave empty to keep the default global tabs and Shopify description fallback.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "items",
          title: "Tabs",
          type: "array",
          description:
            "Create the exact sections this product should show. Order here matches the frontend tab order.",
          of: [
            defineArrayMember({
              type: "object",
              name: "tabItem",
              fields: [
                defineField({
                  name: "id",
                  title: "Tab ID",
                  type: "string",
                  description:
                    "Stable identifier for this tab. Use lowercase kebab-case, for example description, brewing-notes, storage, ingredients.",
                  validation: (rule) =>
                    rule.required().regex(/^[a-z0-9-]+$/, {
                      name: "lowercase slug",
                    }),
                }),
                defineField({
                  name: "label",
                  title: "Tab label",
                  type: "localeString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "paragraphs",
                  title: "Paragraphs",
                  type: "array",
                  of: [defineArrayMember({ type: "localeText" })],
                  validation: (rule) => rule.required().min(1),
                }),
              ],
              preview: {
                select: { title: "label.en", subtitle: "id" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Untitled tab",
                    subtitle: subtitle || "Missing tab ID",
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.max(8),
        }),
      ],
    }),
    defineField({
      name: "rating",
      title: "Rating override",
      type: "object",
      group: "rating",
      description:
        "Optional product-specific rating score and breakdown. Leave empty to use the global defaults from Product page copy.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "average", title: "Average rating", type: "number", validation: (rule) => rule.min(0).max(5) }),
        defineField({
          name: "breakdown",
          title: "Rating breakdown",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "ratingBreakdownItem",
              fields: [
                defineField({ name: "rating", title: "Star count", type: "number", validation: (rule) => rule.required().min(1).max(5) }),
                defineField({ name: "fillPercent", title: "Bar fill percent", type: "number", validation: (rule) => rule.required().min(0).max(100) }),
                defineField({ name: "reviewsCount", title: "Review count", type: "number", validation: (rule) => rule.required().min(0) }),
              ],
              preview: {
                select: { title: "rating", subtitle: "reviewsCount" },
                prepare({ title, subtitle }) {
                  return {
                    title: title ? `${title} star` : "Rating row",
                    subtitle: typeof subtitle === "number" ? `${subtitle} reviews` : "No review count",
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.max(5),
        }),
      ],
    }),
    defineField({
      name: "reviewSummary",
      title: "Review summary",
      type: "object",
      group: "summary",
      description:
        "Optional per-product review summary. Leave fields empty to keep the global defaults.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "count", title: "Review count line", type: "localeString" }),
        defineField({ name: "sectionTitle", title: "Section title", type: "localeString" }),
        defineField({ name: "basedOn", title: "\"Based on\" line", type: "localeString" }),
      ],
    }),
    defineField({
      name: "reviewCarousel",
      title: "Review carousel",
      type: "object",
      group: "reviews",
      description:
        "Optional per-product reviews. Leave empty to keep the current global review carousel.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "verifiedPurchase",
          title: "\"Verified purchase\" label",
          type: "localeString",
        }),
        defineField({
          name: "items",
          title: "Reviews",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "reviewItem",
              fields: [
                defineField({ name: "title", title: "Review title", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "body", title: "Review body", type: "localeText", validation: (rule) => rule.required() }),
                defineField({
                  name: "name",
                  title: "Reviewer name",
                  type: "string",
                  description: "Plain text, not translated.",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: "title.en", subtitle: "name" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Untitled review",
                    subtitle: subtitle || "No reviewer name set",
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.max(12),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "productTitle",
      subtitle: "handle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || subtitle || "Untitled Shopify product content",
        subtitle: subtitle ? `Handle: ${subtitle}` : "Missing Shopify handle",
      };
    },
  },
});
