import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact / wholesale page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({ name: "primaryCta", title: "Primary CTA label", type: "localeString" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA label", type: "localeString" }),
        defineField({
          name: "details",
          title: "Detail rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "detailRow",
              fields: [
                defineField({ name: "label", type: "localeString" }),
                defineField({ name: "value", type: "localeString" }),
              ],
              preview: { select: { title: "label.en", subtitle: "value.en" } },
            }),
          ],
        }),
        defineField({ name: "imageAlt", title: "Image alt text", type: "localeString" }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({
          name: "cards",
          title: "Benefit cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "benefitCard",
              fields: [
                defineField({ name: "title", type: "localeString" }),
                defineField({ name: "description", type: "localeText" }),
              ],
              preview: { select: { title: "title.en" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "form",
      title: "Inquiry form",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({ name: "whatWeShareTitle", type: "localeString" }),
        defineField({
          name: "whatWeShareItems",
          title: "\"What we can share\" items",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
        }),
        defineField({
          name: "fields",
          title: "Form fields",
          type: "object",
          fields: [
            "name",
            "business",
            "email",
            "website",
            "location",
            "orderInterest",
          ].map((fieldName) =>
            defineField({
              name: fieldName,
              title: fieldName,
              type: "object",
              fields: [
                defineField({ name: "label", type: "localeString" }),
                defineField({ name: "placeholder", type: "localeString" }),
              ],
            }),
          ),
        }),
        defineField({ name: "businessTypeLabel", type: "localeString" }),
        defineField({
          name: "businessTypes",
          title: "Business type options",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
        }),
        defineField({ name: "messageLabel", type: "localeString" }),
        defineField({ name: "messagePlaceholder", type: "localeString" }),
        defineField({ name: "notice", title: "Notice text", type: "localeText" }),
        defineField({ name: "submit", title: "Submit button label", type: "localeString" }),
      ],
    }),
    defineField({
      name: "emailCta",
      title: "Email CTA",
      type: "object",
      fields: [
        defineField({ name: "mascotAlt", title: "Mascot image alt text", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({ name: "button", title: "Button label", type: "localeString" }),
      ],
    }),
  ],
});
