import founderPhoto from "@/assets/images/daine-mawer.jpg";
import { faqs, services } from "@/content/home";
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
    areaServed: southAfrica,
    address: { "@type": "PostalAddress", addressCountry: "ZA" },
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
          url: absoluteUrl(`/#${service.id}`),
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

export function legalPageStructuredData(page: {
  path: `/${string}`;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${page.path}#webpage`),
    url: absoluteUrl(page.path),
    name: page.name,
    description: page.description,
    inLanguage: site.locale,
    isPartOf: { "@id": ids.site },
    publisher: { "@id": ids.org },
  };
}
