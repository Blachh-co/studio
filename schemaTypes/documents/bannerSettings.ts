import { defineField, defineType } from "sanity";

export const bannerSettings = defineType({
  name: "bannerSettings",
  title: "Announcement banner",
  type: "document",
  fields: [
    defineField({ name: "message", title: "Message", type: "localeString" }),
  ],
  preview: {
    select: { title: "message.en" },
  },
});
