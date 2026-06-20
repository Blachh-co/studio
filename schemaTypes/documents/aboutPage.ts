import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "titleLineOne", type: "localeString" }),
        defineField({ name: "titleLineTwo", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({
          name: "badges",
          title: "Badges",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
        }),
        defineField({ name: "imageAlt", title: "Image alt text", type: "localeString" }),
      ],
    }),
    defineField({
      name: "why",
      title: "\"Why Blachh\" section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "localeText" })],
        }),
        defineField({ name: "quote", title: "Pull quote", type: "localeText" }),
      ],
    }),
    defineField({
      name: "craft",
      title: "Craft & sourcing section",
      type: "object",
      fields: [
        defineField({ name: "imageEyebrow", type: "localeString" }),
        defineField({ name: "imageTitle", type: "localeString" }),
        defineField({ name: "imageAlt", title: "Image alt text", type: "localeString" }),
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [defineArrayMember({ type: "localeText" })],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Closing CTA",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({ name: "button", title: "Button label", type: "localeString" }),
      ],
    }),
  ],
});
