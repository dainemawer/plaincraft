import founderPhoto from "@/assets/images/daine-mawer.jpg";
import { type Article, articlePath } from "@/content/articles";
import { faqs, services } from "@/content/home";
import {
  type Market,
  markets,
  type ServicePrice,
  servicePriceById,
} from "@/content/pricing";
import {
  type ServiceDetail,
  serviceDetailById,
  servicePath,
} from "@/content/services";
import { absoluteUrl, site } from "./site";

type JsonLdNode = Record<string, unknown>;

const ids = {
  org: absoluteUrl("/#org"),
  site: absoluteUrl("/#site"),
  founder: absoluteUrl("/#founder"),
  home: absoluteUrl("/#webpage"),
  faq: absoluteUrl("/#faq"),
};

const southAfrica = { "@type": "Country", name: "South Africa" };

const eligibleRegion: Record<Market, JsonLdNode | JsonLdNode[]> = {
  za: { "@type": "Country", name: "South Africa" },
  uk: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Place", name: "Europe" },
  ],
};

/** One Offer per market and price option, with "from" prices as minPrice. */
function offers(price: ServicePrice | undefined, url: string): JsonLdNode[] {
  if (!price) return [];
  return (Object.keys(markets) as Market[]).flatMap((market) =>
    price[market].map((option) => ({
      "@type": "Offer",
      name: option.label,
      url,
      eligibleRegion: eligibleRegion[market],
      priceSpecification: {
        "@type": option.per ? "UnitPriceSpecification" : "PriceSpecification",
        priceCurrency: markets[market].currency,
        ...(option.from
          ? { minPrice: option.amount }
          : { price: option.amount }),
        ...(option.per ? { unitText: option.per.toUpperCase() } : {}),
      },
    })),
  );
}

function organization(): JsonLdNode {
  return {
    "@type": "ProfessionalService",
    "@id": ids.org,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    email: site.email,
    description: site.description,
    keywords: site.keywords.join(", "),
    areaServed: southAfrica,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cape Town",
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      url: absoluteUrl("/contact"),
      areaServed: "ZA",
      availableLanguage: "English",
    },
    knowsAbout: [
      "Artificial intelligence",
      "AI strategy",
      "Business process automation",
      "AI governance",
      "POPIA compliance",
      "AI training",
    ],
    founder: { "@id": ids.founder },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI consultancy services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.schemaName,
          description: service.body,
          url: serviceUrl(service.id),
          provider: { "@id": ids.org },
          areaServed: southAfrica,
        },
      })),
    },
  };
}

function founder(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": ids.founder,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    url: site.founder.url,
    image: absoluteUrl(founderPhoto.src),
    worksFor: { "@id": ids.org },
    homeLocation: { "@type": "Place", name: site.founder.location },
    knowsAbout: [
      "Artificial intelligence",
      "AI-assisted software engineering",
      "Web performance",
      "Product engineering",
    ],
    sameAs: [site.linkedInUrl, site.founder.url],
  };
}

function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": ids.site,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    publisher: { "@id": ids.org },
  };
}

function homePage(): JsonLdNode {
  return {
    "@type": "WebPage",
    "@id": ids.home,
    url: absoluteUrl("/"),
    name: site.title,
    description: site.description,
    inLanguage: site.locale,
    isPartOf: { "@id": ids.site },
    about: { "@id": ids.org },
    primaryImageOfPage: absoluteUrl("/opengraph-image"),
  };
}

/** FAQ answers mirror the visible copy word for word, as search engines require. */
function faqPage(): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": ids.faq,
    isPartOf: { "@id": ids.home },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), founder(), website(), homePage(), faqPage()],
  };
}

export type ProsePageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage";

export type Crumb = { name: string; path: `/${string}` };

type PageInput = {
  type: ProsePageType;
  path: `/${string}`;
  name: string;
  description: string;
  trail: Crumb[];
};

/** A page node and its breadcrumb trail. */
function pageNodes(page: PageInput): JsonLdNode[] {
  const breadcrumbId = absoluteUrl(`${page.path}#breadcrumb`);
  return [
    {
      "@type": page.type,
      "@id": absoluteUrl(`${page.path}#webpage`),
      url: absoluteUrl(page.path),
      name: page.name,
      description: page.description,
      inLanguage: site.locale,
      isPartOf: { "@id": ids.site },
      publisher: { "@id": ids.org },
      about: { "@id": ids.org },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: page.trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    },
  ];
}

export function prosePageStructuredData(page: PageInput) {
  return { "@context": "https://schema.org", "@graph": pageNodes(page) };
}

function serviceUrl(id: string) {
  const detail = serviceDetailById.get(id);
  return absoluteUrl(detail ? servicePath(detail) : `/#${id}`);
}

/** Page, breadcrumb, Service and FAQ nodes for an individual service page. */
export function servicePageStructuredData(
  detail: ServiceDetail,
  trail: Crumb[],
) {
  const path = servicePath(detail);
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...pageNodes({
        type: "WebPage",
        path,
        name: detail.title,
        description: detail.description,
        trail,
      }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: detail.name,
        serviceType: detail.serviceType,
        description: detail.description,
        url,
        image: absoluteUrl(detail.photo.src.src),
        provider: { "@id": ids.org },
        areaServed: southAfrica,
        offers: offers(servicePriceById.get(detail.id), url),
        audience: {
          "@type": "BusinessAudience",
          name: "Small and medium-sized businesses with 10–250 staff",
        },
        mainEntityOfPage: { "@id": `${url}#webpage` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: detail.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

const blogId = absoluteUrl("/blog#blog");

/** The blog (or one of its category pages) and the articles it lists. */
export function blogStructuredData(
  page: Omit<PageInput, "type">,
  list: Article[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...pageNodes({ ...page, type: "CollectionPage" }),
      {
        "@type": "Blog",
        "@id": blogId,
        url: absoluteUrl("/blog"),
        name: `${site.name} blog`,
        description:
          "Practical guides on where AI helps South African small businesses, where it doesn't and how to start.",
        inLanguage: site.locale,
        publisher: { "@id": ids.org },
        blogPost: list.map((article) => ({
          "@id": absoluteUrl(`${articlePath(article)}#article`),
        })),
      },
      ...list.map((article) => ({
        "@type": "BlogPosting",
        "@id": absoluteUrl(`${articlePath(article)}#article`),
        url: absoluteUrl(articlePath(article)),
        headline: article.title,
        datePublished: article.date,
      })),
    ],
  };
}

/** A single article: page, breadcrumb and BlogPosting nodes, plus the author. */
export function articleStructuredData(article: Article, trail: Crumb[]) {
  const path = articlePath(article);
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...pageNodes({
        type: "WebPage",
        path,
        name: article.title,
        description: article.description,
        trail,
      }),
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        url,
        headline: article.title,
        description: article.description,
        image: absoluteUrl(article.image.src.src),
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        inLanguage: site.locale,
        articleSection: article.category,
        keywords: article.tags.join(", "),
        timeRequired: `PT${article.readMinutes}M`,
        author: { "@id": ids.founder },
        publisher: { "@id": ids.org },
        isPartOf: { "@id": blogId },
      },
      founder(),
    ],
  };
}

/** The pricing page: page, breadcrumb, the priced services and its FAQs. */
export function pricingPageStructuredData(
  page: Omit<PageInput, "type">,
  faqItems: { question: string; answer: string }[],
) {
  const url = absoluteUrl(page.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...pageNodes({ ...page, type: "WebPage" }),
      {
        "@type": "OfferCatalog",
        "@id": `${url}#catalog`,
        name: `${site.name} price list`,
        url,
        itemListElement: services.map((service) => ({
          "@type": "Service",
          name: service.schemaName,
          url: serviceUrl(service.id),
          provider: { "@id": ids.org },
          offers: offers(
            servicePriceById.get(service.id),
            serviceUrl(service.id),
          ),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
