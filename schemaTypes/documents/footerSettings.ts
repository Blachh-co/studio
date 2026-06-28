import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Link labels",
      description: "Decorative labels only — these do not control routing.",
      type: "array",
      of: [{ type: "localeString" }],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "copyright",
      title: "Copyright line",
      type: "localeString",
      description: "Short ownership line shown at the bottom of the footer.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "copyright.en",
    },
    prepare({ title }) {
      return {
        title: "Footer",
        subtitle: title || "Footer labels",
      };
    },
  },
});
