import { defineArrayMember, defineField, defineType } from "sanity";

export const emailFooterSettings = defineType({
  name: "emailFooterSettings",
  title: "Email footer",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      description: "Localized labels with real hrefs for email footer links.",
      of: [
        defineArrayMember({
          type: "object",
          name: "emailFooterLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label.en",
              subtitle: "href",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Untitled email footer link",
                subtitle: subtitle || "No href set",
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "supportEmail",
      title: "Support email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "wholesaleEmail",
      title: "Wholesale email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "copyright",
      title: "Copyright line",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "copyright.en",
    },
    prepare({ title }) {
      return {
        title: "Email footer",
        subtitle: title || "Email footer content",
      };
    },
  },
});
