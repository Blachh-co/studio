import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "catalog", title: "Collections" },
    { name: "community", title: "Community" },
    { name: "follow", title: "Follow Blachh" },
    { name: "socialProof", title: "Testimonials" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      description: "Main first-screen content and background image for the home page.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "title",
          title: "Headline",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "localeText",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "rating",
          title: "Rating line",
          type: "localeString",
          description: "Short trust signal beneath the hero copy, for example review count or star rating.",
        }),
        defineField({
          name: "cta",
          title: "Primary CTA label",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          description:
            "Background image for the home hero. Wide landscape images work best. The frontend falls back to the current asset if this is empty or unavailable.",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageAlt",
          title: "Hero image alt text",
          type: "localeString",
          description: "Accessible description for the hero image.",
        }),
      ],
    }),
    defineField({
      name: "collections",
      title: "Collections section",
      type: "object",
      group: "catalog",
      description: "Intro copy above the featured product collections.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "cta", title: "Section CTA label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "sizeDefault", title: "Default size label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "priceFrom", title: "\"From\" price label", type: "localeString", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "community",
      title: "Community section",
      type: "object",
      group: "community",
      description: "Community media carousel and Instagram follow callout.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Headline", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({
          name: "cards",
          title: "Media cards",
          type: "array",
          description:
            "Add short videos and/or images for the community carousel. Keep the set tight so it stays easy to browse.",
          of: [
            defineArrayMember({
              type: "object",
              name: "communityCard",
              fields: [
                defineField({
                  name: "title",
                  title: "Card title",
                  type: "localeString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "video",
                  title: "Video",
                  type: "file",
                  description: "Optional short looping clip for the community carousel.",
                  options: { accept: "video/*" },
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  description: "Optional image for the community carousel.",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "imageAlt",
                  title: "Image alt text",
                  type: "localeString",
                  description: "Accessible description for the image card.",
                  hidden: ({ parent }) => !parent?.image,
                }),
              ],
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value || typeof value !== "object") {
                    return true;
                  }

                  const card = value as { video?: unknown; image?: unknown };
                  return card.video || card.image
                    ? true
                    : "Add at least one media source: a video or an image.";
                }),
              preview: {
                select: { title: "title.en", hasVideo: "video.asset", hasImage: "image.asset" },
                prepare({ title, hasVideo, hasImage }) {
                  const mediaLabel = hasVideo
                    ? hasImage
                      ? "Video and image card"
                      : "Video card"
                    : hasImage
                      ? "Image card"
                      : "Missing media";
                  return {
                    title: title || "Untitled community card",
                    subtitle: `Community ${mediaLabel}`,
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1).max(6),
        }),
        defineField({
          name: "followText",
          title: "Follow prompt",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "instagramHandle",
          title: "Instagram handle",
          type: "string",
          description: "Plain text, not translated (e.g. @blachh.co).",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "followCta",
          title: "Follow CTA label",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "mascotImage",
          title: "Mascot image",
          type: "image",
          description:
            "Mascot shown beside the Instagram follow prompt. The frontend falls back to the current asset if this is empty or unavailable.",
          options: { hotspot: true },
        }),
        defineField({
          name: "mascotAlt",
          title: "Mascot image alt text",
          type: "localeString",
        }),
      ],
    }),
    defineField({
      name: "followBlachh",
      title: "Follow Blachh section",
      type: "object",
      group: "follow",
      description: "Social follow strip shown above the footer.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "instagramUrl",
          title: "Instagram URL",
          type: "url",
          validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "tiktokUrl",
          title: "TikTok URL",
          type: "url",
          validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "cards",
          title: "Media cards",
          type: "array",
          description: "Images and videos shown in the left-aligned social strip.",
          of: [
            defineArrayMember({
              type: "object",
              name: "followBlachhCard",
              fields: [
                defineField({
                  name: "title",
                  title: "Card title",
                  type: "localeString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "video",
                  title: "Video",
                  type: "file",
                  description: "Optional short clip for the social strip.",
                  options: { accept: "video/*" },
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  description: "Optional image for the social strip.",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "imageAlt",
                  title: "Image alt text",
                  type: "localeString",
                  hidden: ({ parent }) => !parent?.image,
                }),
              ],
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value || typeof value !== "object") {
                    return true;
                  }

                  const card = value as { video?: unknown; image?: unknown };
                  return card.video || card.image
                    ? true
                    : "Add at least one media source: a video or an image.";
                }),
              preview: {
                select: { title: "title.en", hasVideo: "video.asset", hasImage: "image.asset" },
                prepare({ title, hasVideo, hasImage }) {
                  const mediaLabel = hasVideo
                    ? hasImage
                      ? "Video and image card"
                      : "Video card"
                    : hasImage
                      ? "Image card"
                      : "Missing media";
                  return {
                    title: title || "Untitled social card",
                    subtitle: `Follow Blachh ${mediaLabel}`,
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1).max(8),
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials section",
      type: "object",
      group: "socialProof",
      description: "Customer reviews shown in the home page testimonial carousel.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "titleStart", title: "Title part 1", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "titleAccentOne", title: "Title accent 1", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "titleAccentTwo", title: "Title accent 2", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "titleEnd", title: "Title ending", type: "localeString", validation: (rule) => rule.required() }),
        defineField({ name: "description", title: "Description", type: "localeText", validation: (rule) => rule.required() }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          description: "Customer quotes shown in the review carousel.",
          of: [
            defineArrayMember({
              type: "object",
              name: "testimonialItem",
              fields: [
                defineField({
                  name: "imageUrl",
                  title: "Image URL",
                  type: "string",
                  description:
                    "Avatar image path or URL. The current frontend expects a plain string, for example /mock/testimonial-person-1.png.",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "review",
                  title: "Review text",
                  type: "localeText",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "reviewerName",
                  title: "Reviewer name",
                  type: "string",
                  description: "Plain text, not translated.",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: "reviewerName", subtitle: "review.en" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Unnamed reviewer",
                    subtitle: subtitle || "No review text set",
                  };
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1).max(12),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home page",
        subtitle: "Hero, collections, community, and testimonials",
      };
    },
  },
});
