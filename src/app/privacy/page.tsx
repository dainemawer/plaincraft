import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const title = "Privacy & POPIA notice";
const description = `How ${site.name} collects, uses and protects personal information, in line with South Africa's Protection of Personal Information Act (POPIA).`;

export const metadata = pageMetadata({ title, description, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title={title}
      description={description}
      updated="2026-11-11"
    >
      <h2>Who we are</h2>
      <p>
        {site.name} is an independent AI consultancy based in South Africa. For
        the purposes of POPIA, {site.name} is the responsible party for personal
        information collected through this website. You can reach our
        Information Officer at <a href={`mailto:${site.email}`}>{site.email}</a>
        .
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Information you send us</strong>, such as your name, email
          address, company and anything you write when you email us or book a
          call.
        </li>
        <li>
          <strong>Anonymous usage data</strong>. We use Vercel Web Analytics and
          Speed Insights to understand page views and site performance. These
          tools do not use cookies and do not identify individual visitors.
        </li>
      </ul>
      <p>
        This website does not use advertising or tracking cookies, and we do not
        sell personal information.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>To respond to your enquiry and arrange a discovery call.</li>
        <li>To prepare and deliver an engagement you have agreed to.</li>
        <li>To keep this website secure and working well.</li>
      </ul>
      <p>
        We process personal information only where POPIA allows it: with your
        consent, to take steps towards or perform a contract with you, or for
        our legitimate interest in running the business.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share personal information only with service providers that help us
        operate, such as our website host, email provider and booking tool, and
        only as far as they need it. Some of these providers store data outside
        South Africa. Where that happens, we rely on providers bound by data
        protection laws or agreements that give a level of protection comparable
        to POPIA.
      </p>

      <h2>Client data</h2>
      <p>
        Information you share with us during an engagement is covered by our
        written engagement terms and, on request, a non-disclosure agreement.
        Client data stays in your own accounts wherever possible and is never
        used to train third-party AI models without your consent.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep personal information only for as long as we need it for the
        purposes above, or as long as the law requires, and then delete it
        securely.
      </p>

      <h2>Your rights</h2>
      <p>Under POPIA you may ask us to:</p>
      <ul>
        <li>confirm whether we hold personal information about you;</li>
        <li>give you access to it;</li>
        <li>correct or delete it;</li>
        <li>stop processing it, or object to direct marketing.</li>
      </ul>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> to make a
        request. If you are unhappy with how we handle your information, you can
        complain to the{" "}
        <a href="https://inforegulator.org.za/">
          Information Regulator (South Africa)
        </a>
        .
      </p>

      <h2>Changes to this notice</h2>
      <p>
        We may update this notice from time to time. The date at the top of the
        page shows when it last changed.
      </p>
    </LegalPage>
  );
}
