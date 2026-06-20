import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure, singletonTypes } from "./structure";

export default defineConfig({
  name: "blachh-studio",
  title: "Blachh",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "REPLACE_WITH_PROJECT_ID",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Singleton documents: exactly one of each, edited in place, never
  // duplicated or deleted, and hidden from the generic "create new" menu.
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) => !["duplicate", "delete", "unpublish"].includes(action ?? ""),
          )
        : input,
    newDocumentOptions: (prev) =>
      prev.filter((item) => !singletonTypes.has(item.templateId)),
  },
});
