import { defineField, defineType } from "sanity";

export const bannerSettings = defineType({
  name: "bannerSettings",
  title: "Announcement banner",
  type: "document",
  fields: [
    defineField({
      name: "message",
      title: "Banner message",
      type: "localeString",
      description:
        "Short announcement shown at the very top of the site. Keep it concise so it stays readable on mobile.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "message.en" },
    prepare({ title }) {
      return {
        title: "Announcement banner",
        subtitle: title || "No message set",
      };
    },
  },
});
