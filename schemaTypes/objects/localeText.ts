import { defineField, defineType } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Localized paragraph",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "th", title: "Thai", type: "text", rows: 3 }),
    defineField({ name: "sv", title: "Swedish", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "en" },
  },
});
