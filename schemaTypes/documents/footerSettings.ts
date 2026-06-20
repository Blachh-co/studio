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
    }),
    defineField({ name: "copyright", title: "Copyright line", type: "localeString" }),
  ],
});
