import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { bannerSettings } from "./documents/bannerSettings";
import { emailFooterSettings } from "./documents/emailFooterSettings";
import { footerSettings } from "./documents/footerSettings";
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { productCopy } from "./documents/productCopy";
import { siteSettings } from "./documents/siteSettings";
import { shopifyProductContent } from "./documents/shopifyProductContent";

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  // Singleton documents
  siteSettings,
  bannerSettings,
  emailFooterSettings,
  footerSettings,
  homePage,
  aboutPage,
  contactPage,
  productCopy,
  shopifyProductContent,
];
