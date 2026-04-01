import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — meetio",
  description: "meetio privacy policy. Learn how we handle your data.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
      <hr className="mt-8 border-border" />
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-muted leading-relaxed">{children}</p>;
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-foreground underline hover:no-underline" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-4 text-center">meetio Privacy Policy</h1>
      <p className="text-muted mb-8 text-center"><strong>Last updated: January 20, 2025</strong></p>

      <P>
        meetio is a voice-powered bug reporting tool. We only collect data when you actively start a recording. Your recordings stay on your device until you choose to submit them. We do not sell your data or use it for advertising.
      </P>

      <hr className="my-8 border-border" />

      <Section title="Data Controller">
        <P>meetio is operated by <strong>meetio.ai</strong>, located at Stiftsbogen 144, 81375 Munich, Germany. For privacy inquiries, contact <Link href="mailto:founders@meetio.ai">founders@meetio.ai</Link>.</P>
      </Section>

      <Section title="What We Collect">
        <P>The meetio extension collects data only when you actively initiate a recording. We do not collect any data in the background or without your explicit action.</P>
        <P>When you click &ldquo;Start Recording,&rdquo; the extension captures screen activity (visual snapshots of the webpage, user interactions like clicks and scrolls, page changes, and navigation), optional audio narration if you enable it and grant microphone permission, network activity (HTTP requests and responses with sensitive data automatically redacted), system context (browser version, operating system, screen resolution, page URL, timezone), and thumbnail screenshots for visual preview.</P>
        <P>We do not collect GPS location, webcam footage, files from your computer, browsing history outside of the recorded session, data from other tabs, or passwords and credentials (these are automatically redacted).</P>
      </Section>

      <Section title="How We Use Your Data">
        <P>We use your data to provide the bug reporting service you requested, display recordings for review before submission, store and deliver submitted bug reports to your team, and improve our service. We do not use your data for any other purpose.</P>
      </Section>

      <Section title="Legal Basis for Processing">
        <P>We process your data based on your consent (you actively initiate each recording session), contractual necessity (to provide the bug reporting service you requested), and legitimate interests (to maintain and improve our service and ensure security).</P>
      </Section>

      <Section title="How Data Is Stored">
        <P>All recorded data is stored locally in your browser until you choose to submit it. Recordings never leave your device until you click &ldquo;Submit.&rdquo; You can review and delete recordings before submission, and unsubmitted drafts can be deleted anytime from the extension.</P>
        <P>When you submit a bug report, data is transmitted securely via HTTPS to our servers in the European Union. Reports are associated with your authenticated account, and only you and authorized team members can access your reports.</P>
      </Section>

      <Section title="Data Retention">
        <P>Local drafts remain stored until you delete them or clear your browser data. Submitted reports are retained while your account is active or as configured by your organization. You can request deletion of your data at any time by contacting <Link href="mailto:founders@meetio.ai">founders@meetio.ai</Link>.</P>
      </Section>

      <Section title="Data Processing">
        <P>Your data is stored in the European Union. We use third-party service providers (such as AI services for analyzing recordings) that process data on our behalf. We ensure appropriate safeguards are in place for such processing in compliance with GDPR.</P>
      </Section>

      <Section title="Data Sharing">
        <P>We do not sell your data to third parties, share data with advertisers, use your data for purposes unrelated to bug reporting, or use your data to determine creditworthiness.</P>
        <P>We share data with your organization&apos;s team members based on project permissions, with service providers who help operate our service (such as cloud hosting and analytics) under data protection agreements, in connection with a merger, acquisition, or sale of assets (you will be notified), and when required by law.</P>
      </Section>

      <Section title="Your Privacy Rights">
        <P>You have the right to access and view your recorded data before submission, delete recordings and request deletion of submitted reports, export your data in a portable format, withdraw consent by stopping use of the extension at any time, and lodge a complaint with your local data protection authority if you believe your rights have been violated.</P>
        <P>To exercise these rights, contact <Link href="mailto:founders@meetio.ai">founders@meetio.ai</Link>.</P>
      </Section>

      <Section title="California Privacy Rights (CCPA)">
        <P>California residents have additional rights: the right to know what personal information we collect and how it is used, the right to request deletion of personal information, the right to opt-out of sale (we do not sell personal information), and the right to non-discrimination for exercising these rights.</P>
      </Section>

      <Section title="European Users (GDPR)">
        <P>As a Germany-based company, we are committed to GDPR compliance. If you are in the European Economic Area, you have additional rights including rectification of inaccurate personal data, restriction of processing, objection to processing based on legitimate interests, and data portability.</P>
        <P>Our legal bases for processing are consent (Art. 6(1)(a)), contract performance (Art. 6(1)(b)), and legitimate interests (Art. 6(1)(f)).</P>
        <P>To exercise these rights or lodge a complaint, contact <Link href="mailto:founders@meetio.ai">founders@meetio.ai</Link> or your local supervisory authority. In Germany, this is the Bayerisches Landesamt für Datenschutzaufsicht (BayLDA).</P>
      </Section>

      <Section title="Data Protection Features">
        <P>The extension automatically redacts sensitive information including passwords, authentication tokens, API keys, credit card numbers, and authorization headers.</P>
        <P>You also have manual privacy controls: Blur Mode lets you select page elements to hide in your recording, Audio Toggle lets you choose whether to include voice narration, Pre-submission Review lets you preview exactly what will be sent before submitting, and Draft Deletion lets you remove any recording at any time.</P>
      </Section>

      <Section title="Security">
        <P>We protect your data through HTTPS encryption for all data transmission, secure authentication via industry-standard protocols, and origin validation to prevent unauthorized access.</P>
        <P>No system is perfectly secure. While we use industry-standard security measures, we cannot guarantee that unauthorized access, data loss, or breaches will never occur.</P>
      </Section>

      <Section title="Children&apos;s Privacy">
        <P>meetio is not intended for use by children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact <Link href="mailto:founders@meetio.ai">founders@meetio.ai</Link>.</P>
      </Section>

      <Section title="Chrome Web Store Compliance">
        <P>meetio&apos;s use of information received from Google APIs adheres to the <Link href="https://developer.chrome.com/docs/webstore/program-policies/">Chrome Web Store User Data Policy</Link>, including the Limited Use requirements.</P>
      </Section>

      <Section title="Changes to This Policy">
        <P>We update this privacy policy when our practices change or when required by law. We notify you of significant changes through the extension or via email.</P>
      </Section>

      <Section title="Contact Us">
        <P>For questions about this privacy policy or your data, email <Link href="mailto:founders@meetio.ai">founders@meetio.ai</Link> or visit <Link href="https://meetio.ai">https://meetio.ai</Link>.</P>
      </Section>

      <p className="text-muted text-sm italic">
        This privacy policy is provided for informational purposes. For legal advice, consult with a qualified attorney.
      </p>
    </div>
  );
}
