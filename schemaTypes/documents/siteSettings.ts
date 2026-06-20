import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: ["brand", "media"],
      description: "Primary logo used in the site navigation. Upload a wide logo with transparent background when possible.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logoAlt",
      title: "Logo alt text",
      type: "localeString",
      group: "brand",
      description: "Accessible text for the logo image. Keep it short and descriptive.",
    }),
  ],
  preview: {
    select: {
      media: "logo",
      subtitle: "logoAlt.en",
    },
    prepare({ media, subtitle }) {
      return {
        title: "Site settings",
        subtitle: subtitle || "Navigation logo and global brand assets",
        media,
      };
    },
  },
});
