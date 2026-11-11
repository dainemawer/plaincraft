import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const title = "Terms of use";
const description = `The terms that apply when you use the ${site.name} website.`;

export const metadata = pageMetadata({ title, description, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title={title}
      description={description}
      updated="2026-11-11"
    >
      <h2>About these terms</h2>
      <p>
        These terms apply to your use of this website. By using it, you agree to
        them. Consulting engagements are governed separately by a written
        proposal and engagement agreement, which take precedence over anything
        on this site.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content on this website is general information about {site.name}'s
        services. It is not professional, legal or financial advice for your
        specific situation. Examples and the sample audit are illustrative.
      </p>

      <h2>Pricing and availability</h2>
      <p>
        Every engagement is fixed-fee and quoted in writing after a discovery
        call. Nothing on this website is an offer capable of acceptance, and the
        founding-client programme is subject to availability.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, design and branding on this website belong to {site.name}. You
        may share links to it, but please do not copy or republish its content
        without permission.
      </p>

      <h2>Links to other websites</h2>
      <p>
        This website links to third-party services such as LinkedIn and our
        booking tool. We are not responsible for their content or privacy
        practices.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, {site.name} is not liable for any loss
        arising from your use of this website or reliance on its general
        information.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of South Africa.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
