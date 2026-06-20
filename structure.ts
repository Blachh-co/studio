import {
  ControlsIcon,
  HomeIcon,
  ImageIcon,
  ComposeIcon,
  DocumentsIcon,
  PackageIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { ShopifyProductContentPane } from "./components/ShopifyProductContentPane";

export const singletonDocs = [
  { id: "siteSettings", type: "siteSettings", title: "Site settings" },
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
    .items([
      S.listItem()
        .title("Brand")
        .icon(ImageIcon)
        .child(
          S.list()
            .title("Brand")
            .items([
              S.listItem()
                .id("siteSettings")
                .title("Site settings")
                .icon(ControlsIcon)
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .id("bannerSettings")
                .title("Announcement banner")
                .icon(ComposeIcon)
                .child(S.document().schemaType("bannerSettings").documentId("bannerSettings")),
              S.listItem()
                .id("footerSettings")
                .title("Footer")
                .icon(DocumentsIcon)
                .child(S.document().schemaType("footerSettings").documentId("footerSettings")),
            ]),
        ),
      S.listItem()
        .title("Pages")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .id("homePage")
                .title("Home page")
                .icon(HomeIcon)
                .child(S.document().schemaType("homePage").documentId("homePage")),
              S.listItem()
                .id("aboutPage")
                .title("About page")
                .icon(DocumentsIcon)
                .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
              S.listItem()
                .id("contactPage")
                .title("Contact / wholesale page")
                .icon(ComposeIcon)
                .child(S.document().schemaType("contactPage").documentId("contactPage")),
            ]),
        ),
      S.listItem()
        .title("Commerce Copy")
        .icon(PackageIcon)
        .child(
          S.list()
            .title("Commerce Copy")
            .items([
              S.listItem()
                .id("productCopy")
                .title("Product page copy")
                .icon(PackageIcon)
                .child(S.document().schemaType("productCopy").documentId("productCopy")),
              S.listItem()
                .id("shopifyProductContent")
                .title("Shopify product content")
                .icon(PackageIcon)
                .child(
                  S.component()
                    .id("shopifyProductContentPane")
                    .title("Shopify product content")
                    .component(ShopifyProductContentPane),
                ),
            ]),
        ),
    ]);
