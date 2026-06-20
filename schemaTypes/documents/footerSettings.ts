import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "mascotImage",
      title: "Mascot image",
      type: "image",
      group: "media",
      description:
        "Mascot shown in the footer. The frontend falls back to the current asset if nothing is uploaded.",
      options: { hotspot: true },
    }),
    defineField({
      name: "mascotAlt",
      title: "Mascot alt text",
      type: "localeString",
      group: "media",
      description: "Accessible description for the footer mascot image.",
    }),
    defineField({
      name: "links",
      title: "Link labels",
      description: "Decorative labels only — these do not control routing.",
      type: "array",
      of: [{ type: "localeString" }],
      group: "content",
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "copyright",
      title: "Copyright line",
      type: "localeString",
      group: "content",
      description: "Short ownership line shown at the bottom of the footer.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "copyright.en",
      media: "mascotImage",
    },
    prepare({ title, media }) {
      return {
        title: "Footer",
        subtitle: title || "Footer labels and mascot",
        media,
      };
    },
  },
});
