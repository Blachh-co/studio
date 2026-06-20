import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact / wholesale page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "benefits", title: "Benefits" },
    { name: "form", title: "Form" },
    { name: "cta", title: "Email CTA" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      description: "Top section for wholesale or partnership outreach.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({ name: "primaryCta", title: "Primary CTA label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "secondaryCta", title: "Secondary CTA label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "details",
          title: "Detail rows",
          type: "array",
          description: "Short fact blocks shown beneath the hero copy.",
          of: [
            defineArrayMember({
              type: "object",
              name: "detailRow",
              fields: [
                defineField({ name: "label", title: "Label", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "value", title: "Value", type: "localeString", validation: (rule) => rule.required() }),
              ],
              preview: {
                select: { title: "label.en", subtitle: "value.en" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Untitled detail row",
                    subtitle: subtitle || "No value set",
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(3).max(3),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          description:
            "Editorial image shown beside the wholesale intro. The frontend falls back to the current asset if this is empty or unavailable.",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageAlt",
          title: "Image alt text",
          type: "localeString",
          description: "Accessible description for the hero image.",
        }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits section",
      type: "object",
      group: "benefits",
      description: "Supporting reasons to partner with the brand.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({
          name: "cards",
          title: "Benefit cards",
          type: "array",
          description: "Short cards describing the reasons to stock or partner with Blachh.",
          of: [
            defineArrayMember({
              type: "object",
              name: "benefitCard",
              fields: [
                defineField({ name: "title", title: "Card title", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "description", title: "Card description", type: "localeText", validation: (rule) => rule.required() }),
              ],
              preview: {
                select: { title: "title.en", subtitle: "description.en" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Untitled benefit card",
                    subtitle: subtitle || "No description set",
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: "form",
      title: "Inquiry form",
      type: "object",
      group: "form",
      description: "Copy for the wholesale inquiry form and supporting helper text.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({ name: "whatWeShareTitle", title: "\"What we can share\" title", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "whatWeShareItems",
          title: "\"What we can share\" items",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
          validation: (rule) => rule.required().min(1).max(8),
        }),
        defineField({
          name: "fields",
          title: "Form fields",
          type: "object",
          description: "Field labels and placeholders shown in the inquiry form.",
          options: { collapsible: true, collapsed: false },
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
              title: fieldName.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
              type: "object",
              options: { collapsible: true, collapsed: true },
              fields: [
                defineField({ name: "label", title: "Label", type: "localeString", validation: (rule) => rule.required() }),
                defineField({ name: "placeholder", title: "Placeholder", type: "localeString", validation: (rule) => rule.required() }),
              ],
            }),
          ),
        }),
        defineField({ name: "businessTypeLabel", title: "Business type label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "businessTypes",
          title: "Business type options",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
          validation: (rule) => rule.required().min(1).max(8),
        }),
        defineField({ name: "messageLabel", title: "Message label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "messagePlaceholder", title: "Message placeholder", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "notice", title: "Notice text", type: "localeText", validation: (rule) => rule.required() }),
        defineField({ name: "submit", title: "Submit button label", type: "localeString", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "emailCta",
      title: "Email CTA",
      type: "object",
      group: "cta",
      description: "Bottom-of-page fallback call to action for direct email contact.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "mascotImage",
          title: "Mascot image",
          type: "image",
          description:
            "Mascot shown in the email CTA. The frontend falls back to the current asset if this is empty or unavailable.",
          options: { hotspot: true },
        }),
        defineField({ name: "mascotAlt", title: "Mascot image alt text", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({ name: "button", title: "Button label", type: "localeString", validation: (rule) => rule.required() }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact / wholesale page",
        subtitle: "Hero, partner benefits, inquiry form, and email CTA",
      };
    },
  },
});
