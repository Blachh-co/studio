import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({ name: "rating", title: "Rating line", type: "localeString" }),
        defineField({ name: "cta", title: "CTA label", type: "localeString" }),
      ],
    }),
    defineField({
      name: "collections",
      title: "Collections section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "cta", title: "CTA label", type: "localeString" }),
        defineField({ name: "sizeDefault", title: "Default size label", type: "localeString" }),
        defineField({ name: "priceFrom", title: "\"From\" price label", type: "localeString" }),
      ],
    }),
    defineField({
      name: "community",
      title: "Community section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localeString" }),
        defineField({ name: "title", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "communityCard",
              fields: [
                defineField({ name: "title", title: "Title", type: "localeString" }),
                defineField({
                  name: "video",
                  title: "Video",
                  type: "file",
                  options: { accept: "video/*" },
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: "title.en" },
              },
            }),
          ],
        }),
        defineField({ name: "followText", type: "localeString" }),
        defineField({
          name: "instagramHandle",
          title: "Instagram handle",
          type: "string",
          description: "Plain text, not translated (e.g. @blachh.co).",
        }),
        defineField({ name: "followCta", title: "Follow CTA label", type: "localeString" }),
        defineField({ name: "mascotAlt", title: "Mascot image alt text", type: "localeString" }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials section",
      type: "object",
      fields: [
        defineField({ name: "titleStart", type: "localeString" }),
        defineField({ name: "titleAccentOne", type: "localeString" }),
        defineField({ name: "titleAccentTwo", type: "localeString" }),
        defineField({ name: "titleEnd", type: "localeString" }),
        defineField({ name: "description", type: "localeText" }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "testimonialItem",
              fields: [
                defineField({
                  name: "imageUrl",
                  title: "Image URL",
                  type: "string",
                  description: "Path under /public, e.g. /mock/testimonial-person-1.png.",
                }),
                defineField({ name: "review", title: "Review text", type: "localeText" }),
                defineField({
                  name: "reviewerName",
                  title: "Reviewer name",
                  type: "string",
                  description: "Plain text, not translated.",
                }),
              ],
              preview: {
                select: { title: "reviewerName", subtitle: "review.en" },
              },
            }),
          ],
        }),
      ],
    }),
  ],
});
