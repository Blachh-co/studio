import { defineArrayMember, defineField, defineType } from "sanity";

export const productCopy = defineType({
  name: "productCopy",
  title: "Product page copy",
  type: "document",
  fields: [
    defineField({
      name: "reviewSummary",
      title: "Review summary",
      type: "object",
      fields: [
        defineField({ name: "count", title: "Review count line", type: "localeString" }),
        defineField({ name: "sectionTitle", type: "localeString" }),
        defineField({ name: "basedOn", title: "\"Based on\" line", type: "localeString" }),
      ],
    }),
    defineField({
      name: "tabs",
      title: "Detail tabs",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Tabs",
          type: "array",
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
                  validation: (rule) => rule.required(),
                }),
                defineField({ name: "label", type: "localeString" }),
                defineField({
                  name: "paragraphs",
                  title: "Paragraphs",
                  type: "array",
                  of: [defineArrayMember({ type: "localeText" })],
                }),
              ],
              preview: { select: { title: "label.en", subtitle: "id" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "reviewCarousel",
      title: "Review carousel",
      type: "object",
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
                defineField({ name: "title", type: "localeString" }),
                defineField({ name: "body", type: "localeText" }),
                defineField({
                  name: "name",
                  title: "Reviewer name",
                  type: "string",
                  description: "Plain text, not translated.",
                }),
              ],
              preview: { select: { title: "title.en", subtitle: "name" } },
            }),
          ],
        }),
      ],
    }),
  ],
});
