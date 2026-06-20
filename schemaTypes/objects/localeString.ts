import { defineField, defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized text",
  type: "object",
  fieldsets: [{ name: "translations", title: "Translations", options: { columns: 1 } }],
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "th", title: "Thai", type: "string" }),
    defineField({ name: "sv", title: "Swedish", type: "string" }),
  ],
  preview: {
    select: { title: "en" },
  },
});
