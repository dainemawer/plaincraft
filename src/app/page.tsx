import { About } from "@/components/sections/about";
import { BookCall } from "@/components/sections/book-call";
import { Faq } from "@/components/sections/faq";
import { FoundingOffer } from "@/components/sections/founding-offer";
import { FreeCall } from "@/components/sections/free-call";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { PhotoBand } from "@/components/sections/photo-band";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { ShortVersion } from "@/components/sections/short-version";
import { Trust } from "@/components/sections/trust";
import { WhatAiDoes } from "@/components/sections/what-ai-does";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { homeStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: { absolute: site.title },
  description: site.description,
  path: "/",
  socialTitle: site.shortTitle,
  socialDescription: site.socialDescription,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <Hero />
      <PainPoints />
      <WhatAiDoes />
      <FreeCall />
      <PhotoBand />
      <Services />
      <Process />
      <Trust />
      <About />
      {site.showFoundingOffer ? <FoundingOffer /> : null}
      <ShortVersion />
      <Faq />
      <BookCall />
    </>
  );
}
