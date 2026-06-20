import { defineField, defineType } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Localized paragraph",
  type: "object",
  fieldsets: [{ name: "translations", title: "Translations", options: { columns: 1 } }],
  description:
    "English is required. Thai and Swedish can be left blank temporarily and the site will fall back to English.",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      description: "Primary source paragraph used as the fallback when another locale is blank.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "th",
      title: "Thai",
      type: "text",
      rows: 3,
      description: "Optional translation. Leave blank to fall back to English on the site.",
    }),
    defineField({
      name: "sv",
      title: "Swedish",
      type: "text",
      rows: 3,
      description: "Optional translation. Leave blank to fall back to English on the site.",
    }),
  ],
  preview: {
    select: { title: "en", th: "th", sv: "sv" },
    prepare({ title, th, sv }) {
      const missing = [
        !th ? "Thai" : null,
        !sv ? "Swedish" : null,
      ].filter(Boolean);

      return {
        title: title || "Untitled localized paragraph",
        subtitle: missing.length > 0 ? `Missing: ${missing.join(", ")}` : "All translations present",
      };
    },
  },
});
