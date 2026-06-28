// One-time script: pre-populates the singleton documents in Sanity with
// the copy currently hardcoded in frontend/messages/{en,sv,th}.json, so the
// Studio doesn't start with blank fields.
//
// Usage: SANITY_API_TOKEN=... npm run seed
// (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET picked up from env too)

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(here, "..", "..", "frontend", "messages");

function loadLocale(locale: string) {
  return JSON.parse(readFileSync(path.join(messagesDir, `${locale}.json`), "utf-8"));
}

const en = loadLocale("en");
const th = loadLocale("th");
const sv = loadLocale("sv");

// Picks the same key out of all three locale dictionaries and zips them
// into the { en, th, sv } shape the `localeString`/`localeText` schemas expect.
function pick(getter: (dict: any) => string) {
  return { en: getter(en), th: getter(th), sv: getter(sv) };
}

// Zips three parallel arrays of plain strings into an array of { en, th, sv }.
function zipArray(getter: (dict: any) => string[]) {
  const enArr = getter(en);
  const thArr = getter(th);
  const svArr = getter(sv);
  return enArr.map((_, i) => ({ en: enArr[i], th: thArr[i], sv: svArr[i] }));
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set SANITY_STUDIO_PROJECT_ID and SANITY_API_TOKEN (write-scoped) before running the seed script.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const bannerSettings = {
  _id: "bannerSettings",
  _type: "bannerSettings",
  message: pick((d) => d.banner.message),
};

const footerSettings = {
  _id: "footerSettings",
  _type: "footerSettings",
  links: zipArray((d) => d.footer.links),
  copyright: pick((d) => d.footer.copyright),
};

const emailFooterSettings = {
  _id: "emailFooterSettings",
  _type: "emailFooterSettings",
  links: en.emailFooter.links.map((_: unknown, i: number) => ({
    _type: "emailFooterLink",
    _key: `email-footer-link-${i}`,
    label: {
      en: en.emailFooter.links[i].label,
      th: th.emailFooter.links[i].label,
      sv: sv.emailFooter.links[i].label,
    },
    href: en.emailFooter.links[i].href,
  })),
  supportEmail: en.emailFooter.supportEmail,
  wholesaleEmail: en.emailFooter.wholesaleEmail,
  copyright: pick((d) => d.emailFooter.copyright),
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  hero: {
    eyebrow: pick((d) => d.home.hero.eyebrow),
    title: pick((d) => d.home.hero.title),
    description: pick((d) => d.home.hero.description),
    rating: pick((d) => d.home.hero.rating),
    cta: pick((d) => d.home.hero.cta),
  },
  collections: {
    eyebrow: pick((d) => d.home.collections.eyebrow),
    title: pick((d) => d.home.collections.title),
    cta: pick((d) => d.home.collections.cta),
    sizeDefault: pick((d) => d.home.collections.sizeDefault),
    priceFrom: pick((d) => d.home.collections.priceFrom),
  },
  community: {
    eyebrow: pick((d) => d.home.community.eyebrow),
    title: pick((d) => d.home.community.title),
    description: pick((d) => d.home.community.description),
    cardTitles: zipArray((d) => d.home.community.cardTitles),
    followText: pick((d) => d.home.community.followText),
    instagramHandle: en.home.community.instagramHandle,
    followCta: pick((d) => d.home.community.followCta),
    mascotAlt: pick((d) => d.home.community.mascotAlt),
  },
  followBlachh: {
    title: pick((d) => d.home.followBlachh.title),
    instagramUrl: en.home.followBlachh.instagramUrl,
    tiktokUrl: en.home.followBlachh.tiktokUrl,
  },
  testimonials: {
    titleStart: pick((d) => d.home.testimonials.titleStart),
    titleAccentOne: pick((d) => d.home.testimonials.titleAccentOne),
    titleAccentTwo: pick((d) => d.home.testimonials.titleAccentTwo),
    titleEnd: pick((d) => d.home.testimonials.titleEnd),
    description: pick((d) => d.home.testimonials.description),
    items: en.home.testimonials.items.map((_: unknown, i: number) => ({
      _type: "testimonialItem",
      _key: `testimonial-${i}`,
      imageUrl: en.home.testimonials.items[i].imageUrl,
      review: {
        en: en.home.testimonials.items[i].review,
        th: th.home.testimonials.items[i].review,
        sv: sv.home.testimonials.items[i].review,
      },
      reviewerName: en.home.testimonials.items[i].reviewerName,
    })),
  },
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  hero: {
    eyebrow: pick((d) => d.about.hero.eyebrow),
    titleLineOne: pick((d) => d.about.hero.titleLineOne),
    titleLineTwo: pick((d) => d.about.hero.titleLineTwo),
    description: pick((d) => d.about.hero.description),
    badges: zipArray((d) => d.about.hero.badges),
    imageAlt: pick((d) => d.about.hero.imageAlt),
  },
  why: {
    eyebrow: pick((d) => d.about.why.eyebrow),
    title: pick((d) => d.about.why.title),
    paragraphs: zipArray((d) => d.about.why.paragraphs),
    quote: pick((d) => d.about.why.quote),
  },
  craft: {
    imageEyebrow: pick((d) => d.about.craft.imageEyebrow),
    imageTitle: pick((d) => d.about.craft.imageTitle),
    imageAlt: pick((d) => d.about.craft.imageAlt),
    eyebrow: pick((d) => d.about.craft.eyebrow),
    title: pick((d) => d.about.craft.title),
    description: pick((d) => d.about.craft.description),
    highlights: zipArray((d) => d.about.craft.highlights),
  },
  cta: {
    eyebrow: pick((d) => d.about.cta.eyebrow),
    title: pick((d) => d.about.cta.title),
    description: pick((d) => d.about.cta.description),
    button: pick((d) => d.about.cta.button),
  },
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage",
  hero: {
    eyebrow: pick((d) => d.contact.hero.eyebrow),
    title: pick((d) => d.contact.hero.title),
    description: pick((d) => d.contact.hero.description),
    primaryCta: pick((d) => d.contact.hero.primaryCta),
    secondaryCta: pick((d) => d.contact.hero.secondaryCta),
    details: en.contact.hero.details.map((_: unknown, i: number) => ({
      _type: "detailRow",
      _key: `detail-${i}`,
      label: {
        en: en.contact.hero.details[i].label,
        th: th.contact.hero.details[i].label,
        sv: sv.contact.hero.details[i].label,
      },
      value: {
        en: en.contact.hero.details[i].value,
        th: th.contact.hero.details[i].value,
        sv: sv.contact.hero.details[i].value,
      },
    })),
    imageAlt: pick((d) => d.contact.hero.imageAlt),
  },
  benefits: {
    eyebrow: pick((d) => d.contact.benefits.eyebrow),
    title: pick((d) => d.contact.benefits.title),
    description: pick((d) => d.contact.benefits.description),
    cards: en.contact.benefits.cards.map((_: unknown, i: number) => ({
      _type: "benefitCard",
      _key: `benefit-${i}`,
      title: {
        en: en.contact.benefits.cards[i].title,
        th: th.contact.benefits.cards[i].title,
        sv: sv.contact.benefits.cards[i].title,
      },
      description: {
        en: en.contact.benefits.cards[i].description,
        th: th.contact.benefits.cards[i].description,
        sv: sv.contact.benefits.cards[i].description,
      },
    })),
  },
  form: {
    eyebrow: pick((d) => d.contact.form.eyebrow),
    title: pick((d) => d.contact.form.title),
    description: pick((d) => d.contact.form.description),
    whatWeShareTitle: pick((d) => d.contact.form.whatWeShareTitle),
    whatWeShareItems: zipArray((d) => d.contact.form.whatWeShareItems),
    fields: Object.fromEntries(
      ["name", "business", "email", "website", "location", "orderInterest"].map((key) => [
        key,
        {
          label: pick((d) => d.contact.form.fields[key].label),
          placeholder: pick((d) => d.contact.form.fields[key].placeholder),
        },
      ]),
    ),
    businessTypeLabel: pick((d) => d.contact.form.businessTypeLabel),
    businessTypes: zipArray((d) => d.contact.form.businessTypes),
    messageLabel: pick((d) => d.contact.form.messageLabel),
    messagePlaceholder: pick((d) => d.contact.form.messagePlaceholder),
    notice: pick((d) => d.contact.form.notice),
    submit: pick((d) => d.contact.form.submit),
  },
  emailCta: {
    mascotAlt: pick((d) => d.contact.emailCta.mascotAlt),
    title: pick((d) => d.contact.emailCta.title),
    description: pick((d) => d.contact.emailCta.description),
    button: pick((d) => d.contact.emailCta.button),
  },
};

const productCopy = {
  _id: "productCopy",
  _type: "productCopy",
  reviewSummary: {
    count: pick((d) => d.product.reviewSummary.count),
    sectionTitle: pick((d) => d.product.reviewSummary.sectionTitle),
    basedOn: pick((d) => d.product.reviewSummary.basedOn),
  },
  tabs: {
    items: en.product.tabs.items.map((item: { id: string }, i: number) => ({
      _type: "tabItem",
      _key: item.id,
      id: item.id,
      label: {
        en: en.product.tabs.items[i].label,
        th: th.product.tabs.items[i].label,
        sv: sv.product.tabs.items[i].label,
      },
      paragraphs: zipArray((d) => d.product.tabs.items[i].paragraphs),
    })),
  },
  reviewCarousel: {
    verifiedPurchase: pick((d) => d.product.reviewCarousel.verifiedPurchase),
    items: en.product.reviewCarousel.items.map((_: unknown, i: number) => ({
      _type: "reviewItem",
      _key: `review-${i}`,
      title: {
        en: en.product.reviewCarousel.items[i].title,
        th: th.product.reviewCarousel.items[i].title,
        sv: sv.product.reviewCarousel.items[i].title,
      },
      body: {
        en: en.product.reviewCarousel.items[i].body,
        th: th.product.reviewCarousel.items[i].body,
        sv: sv.product.reviewCarousel.items[i].body,
      },
      name: en.product.reviewCarousel.items[i].name,
    })),
  },
};

const documents: Array<{ _id: string; _type: string } & Record<string, unknown>> = [
  bannerSettings,
  footerSettings,
  emailFooterSettings,
  homePage,
  aboutPage,
  contactPage,
  productCopy,
];

async function run() {
  const tx = client.transaction();
  for (const doc of documents) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(`Seeded ${documents.length} singleton documents.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
