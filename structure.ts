import type { StructureResolver } from "sanity/structure";

export const singletonDocs = [
  { id: "bannerSettings", type: "bannerSettings", title: "Announcement banner" },
  { id: "footerSettings", type: "footerSettings", title: "Footer" },
  { id: "homePage", type: "homePage", title: "Home page" },
  { id: "aboutPage", type: "aboutPage", title: "About page" },
  { id: "contactPage", type: "contactPage", title: "Contact / wholesale page" },
  { id: "productCopy", type: "productCopy", title: "Product page copy" },
] as const;

export const singletonTypes: Set<string> = new Set(singletonDocs.map((doc) => doc.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Site content")
    .items(
      singletonDocs.map((doc) =>
        S.listItem()
          .id(doc.id)
          .title(doc.title)
          .child(S.document().schemaType(doc.type).documentId(doc.id)),
      ),
    );
