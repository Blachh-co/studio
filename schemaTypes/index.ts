import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { bannerSettings } from "./documents/bannerSettings";
import { footerSettings } from "./documents/footerSettings";
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { productCopy } from "./documents/productCopy";

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  // Singleton documents
  bannerSettings,
  footerSettings,
  homePage,
  aboutPage,
  contactPage,
  productCopy,
];
