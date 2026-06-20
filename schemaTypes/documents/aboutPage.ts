import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Story" },
    { name: "craft", title: "Craft" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      description: "Opening copy and image for the About page.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "titleLineOne", title: "Headline line 1", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "titleLineTwo", title: "Headline line 2", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({
          name: "badges",
          title: "Badges",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
          description: "Short supporting chips shown under the hero copy.",
          validation: (rule) => rule.required().min(1).max(6),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          description:
            "Portrait-leaning hero image. The frontend falls back to the current asset if this is empty or unavailable.",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageAlt",
          title: "Image alt text",
          type: "localeString",
          description: "Accessible description for the hero image.",
        }),
      ],
    }),
    defineField({
      name: "why",
      title: "\"Why Blachh\" section",
      type: "object",
      group: "story",
      description: "Longer brand story and pull quote section.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "localeText" })],
          validation: (rule) => rule.required().min(1).max(6),
        }),
        defineField({
          name: "quote",
          title: "Pull quote",
          type: "localeText",
          description: "Short standout quote highlighted beside the story copy.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "craft",
      title: "Craft & sourcing section",
      type: "object",
      group: "craft",
      description: "Image-led section for craft, sourcing, or lifestyle positioning.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "image",
          title: "Section image",
          type: "image",
          description:
            "Editorial image shown beside the craft content. The frontend falls back to the current asset if this is empty or unavailable.",
          options: { hotspot: true },
        }),
        defineField({ name: "imageEyebrow", title: "Image eyebrow", type: "localeString" }),
        defineField({ name: "imageTitle", title: "Image overlay title", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "imageAlt", title: "Image alt text", type: "localeString" }),
        defineField({ name: "eyebrow", title: "Content eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [defineArrayMember({ type: "localeText" })],
          description: "Short supporting points shown as numbered highlight cards.",
          validation: (rule) => rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Closing CTA",
      type: "object",
      group: "cta",
      description: "Final call to action at the bottom of the page.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({ name: "button", title: "Button label", type: "localeString", validation: (rule) => rule.required() }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About page",
        subtitle: "Brand story, craft section, and closing CTA",
      };
    },
  },
});
