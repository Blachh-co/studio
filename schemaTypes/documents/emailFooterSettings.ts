import { defineField, defineType } from "sanity";

export const emailFooterSettings = defineType({
  name: "emailFooterSettings",
  title: "Email footer",
  type: "document",
  fields: [
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
