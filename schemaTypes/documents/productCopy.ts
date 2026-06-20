import { defineArrayMember, defineField, defineType } from "sanity";

export const productCopy = defineType({
  name: "productCopy",
  title: "Product page copy",
  type: "document",
  groups: [
    { name: "catalog", title: "Catalog" },
    { name: "purchase", title: "Purchase" },
    { name: "rating", title: "Ratings" },
    { name: "summary", title: "Review Summary" },
    { name: "tabs", title: "Tabs" },
    { name: "reviews", title: "Review Carousel" },
  ],
  fields: [
    defineField({
      name: "catalog",
      title: "Catalog copy",
      type: "object",
      group: "catalog",
      description: "Listing page labels and price filter thresholds used on the products page.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", title: "Page title", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "categories",
          title: "Category labels",
          type: "object",
          fields: [
            defineField({ name: "all", title: "\"All products\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "matcha", title: "\"Matcha\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "books", title: "\"Books\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "toys", title: "\"Toys\"", type: "localeString", validation: (rule) => rule.required() }),
          ],
        }),
        defineField({
          name: "filters",
          title: "Filter copy",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Filter button title", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "subtitle", title: "Filter subtitle", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "size", title: "\"Size\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "price", title: "\"Price\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "reset", title: "\"Reset\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "apply", title: "\"Apply\"", type: "localeString", validation: (rule) => rule.required() }),
            defineField({
              name: "sizeOptions",
              title: "Size options",
              type: "object",
              fields: [
                defineField({ name: "all", title: "\"All sizes\"", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "small", title: "\"Small\"", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "medium", title: "\"Medium\"", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "large", title: "\"Large\"", type: "localeString", validation: (rule) => rule.required() }),
              ],
            }),
            defineField({
              name: "priceOptions",
              title: "Price filter labels",
              type: "object",
              fields: [
                defineField({ name: "all", title: "\"All prices\"", type: "localeString", validation: (rule) => rule.required() }),
                defineField({
                  name: "sek",
                  title: "SEK labels",
                  type: "object",
                  fields: [
                    defineField({ name: "under", title: "\"Under\"", type: "localeString", validation: (rule) => rule.required() }),
                    defineField({ name: "between", title: "\"Between\"", type: "localeString", validation: (rule) => rule.required() }),
                    defineField({ name: "over", title: "\"Over\"", type: "localeString", validation: (rule) => rule.required() }),
                  ],
                }),
                defineField({
                  name: "eur",
                  title: "EUR labels",
                  type: "object",
                  fields: [
                    defineField({ name: "under", title: "\"Under\"", type: "localeString", validation: (rule) => rule.required() }),
                    defineField({ name: "between", title: "\"Between\"", type: "localeString", validation: (rule) => rule.required() }),
                    defineField({ name: "over", title: "\"Over\"", type: "localeString", validation: (rule) => rule.required() }),
                  ],
                }),
                defineField({
                  name: "usd",
                  title: "USD labels",
                  type: "object",
                  fields: [
                    defineField({ name: "under", title: "\"Under\"", type: "localeString", validation: (rule) => rule.required() }),
                    defineField({ name: "between", title: "\"Between\"", type: "localeString", validation: (rule) => rule.required() }),
                    defineField({ name: "over", title: "\"Over\"", type: "localeString", validation: (rule) => rule.required() }),
                  ],
                }),
              ],
            }),
            defineField({
              name: "thresholds",
              title: "Price thresholds",
              type: "object",
              description: "Numeric breakpoints used for catalog price filtering.",
              fields: [
                defineField({
                  name: "sek",
                  title: "SEK thresholds",
                  type: "object",
                  fields: [
                    defineField({ name: "under", title: "\"Under\" max", type: "number", validation: (rule) => rule.required().min(0) }),
                    defineField({ name: "upper", title: "\"Between\" max", type: "number", validation: (rule) => rule.required().min(0) }),
                  ],
                }),
                defineField({
                  name: "eur",
                  title: "EUR thresholds",
                  type: "object",
                  fields: [
                    defineField({ name: "under", title: "\"Under\" max", type: "number", validation: (rule) => rule.required().min(0) }),
                    defineField({ name: "upper", title: "\"Between\" max", type: "number", validation: (rule) => rule.required().min(0) }),
                  ],
                }),
                defineField({
                  name: "usd",
                  title: "USD thresholds",
                  type: "object",
                  fields: [
                    defineField({ name: "under", title: "\"Under\" max", type: "number", validation: (rule) => rule.required().min(0) }),
                    defineField({ name: "upper", title: "\"Between\" max", type: "number", validation: (rule) => rule.required().min(0) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "labels",
          title: "Catalog labels",
          type: "object",
          fields: [
            defineField({ name: "sizeDefault", title: "Default size label", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "priceFrom", title: "\"From\" label", type: "localeString", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "purchase",
      title: "Purchase copy",
      type: "object",
      group: "purchase",
      description: "Product-detail purchase labels and free shipping thresholds.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "emptyState", title: "Empty state", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "freeShippingPrefix", title: "Free shipping prefix", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "freeShippingThresholds",
          title: "Free shipping thresholds",
          type: "object",
          fields: [
            defineField({ name: "sek", title: "SEK", type: "number", validation: (rule) => rule.required().min(0) }),
            defineField({ name: "eur", title: "EUR", type: "number", validation: (rule) => rule.required().min(0) }),
            defineField({ name: "usd", title: "USD", type: "number", validation: (rule) => rule.required().min(0) }),
          ],
        }),
      ],
    }),
    defineField({
      name: "rating",
      title: "Rating defaults",
      type: "object",
      group: "rating",
      description: "Default rating score and breakdown used when a product does not override them.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "average", title: "Average rating", type: "number", validation: (rule) => rule.required().min(0).max(5) }),
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
          validation: (rule) => rule.required().length(5),
        }),
      ],
    }),
    defineField({
      name: "reviewSummary",
      title: "Review summary",
      type: "object",
      group: "summary",
      description: "Short review summary labels shown near product ratings.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "count", title: "Review count line", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "sectionTitle", title: "Section title", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "basedOn", title: "\"Based on\" line", type: "localeString", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "tabs",
      title: "Detail tabs",
      type: "object",
      group: "tabs",
      description: "Tab labels and body copy used on the product detail page.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "items",
          title: "Tabs",
          type: "array",
          description: "Content tabs shown on the product detail page. Tab IDs must stay stable once used.",
          of: [
            defineArrayMember({
              type: "object",
              name: "tabItem",
              fields: [
                defineField({
                  name: "id",
                  title: "Tab ID",
                  type: "string",
                  description: "Stable identifier used by the frontend, not translated.",
                  validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, {
                    name: "lowercase slug",
                  }),
                }),
                defineField({ name: "label", title: "Tab label", type: "localeString", validation: (rule) => rule.required() }),
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
          validation: (rule) => rule.required().min(1).max(8),
        }),
      ],
    }),
    defineField({
      name: "reviewCarousel",
      title: "Review carousel",
      type: "object",
      group: "reviews",
      description: "Review card copy used lower on the product detail page.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "verifiedPurchase",
          title: "\"Verified purchase\" label",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Reviews",
          type: "array",
          description: "Short review cards shown in the product review carousel.",
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
          validation: (rule) => rule.required().min(1).max(12),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Product page copy",
        subtitle: "Catalog, purchase, ratings, tabs, and reviews",
      };
    },
  },
});
