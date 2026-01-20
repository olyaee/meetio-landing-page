import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">meetio Privacy Policy</h1>
      <p className="text-gray-600 mb-8 text-center"><strong>Last updated: January 20, 2025</strong></p>

      <p className="mb-8">
        meetio is a voice-powered bug reporting tool. We only collect data when you actively start a recording. Your recordings stay on your device until you choose to submit them. We do not sell your data or use it for advertising.
      </p>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Controller</h2>
        <p className="mb-4">
          meetio is operated by <strong>meetio.ai</strong>, located at Stiftsbogen 144, 81375 Munich, Germany. For privacy inquiries, contact <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Collect</h2>
        <p className="mb-4">
          The meetio extension collects data only when you actively initiate a recording. We do not collect any data in the background or without your explicit action.
        </p>
        <p className="mb-4">
          When you click "Start Recording," the extension captures screen activity (visual snapshots of the webpage, user interactions like clicks and scrolls, page changes, and navigation), optional audio narration if you enable it and grant microphone permission, network activity (HTTP requests and responses with sensitive data automatically redacted), system context (browser version, operating system, screen resolution, page URL, timezone), and thumbnail screenshots for visual preview.
        </p>
        <p className="mb-4">
          We do not collect GPS location, webcam footage, files from your computer, browsing history outside of the recorded session, data from other tabs, or passwords and credentials (these are automatically redacted).
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
        <p className="mb-4">
          We use your data to provide the bug reporting service you requested, display recordings for review before submission, store and deliver submitted bug reports to your team, and improve our service. We do not use your data for any other purpose.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
        <p className="mb-4">
          We process your data based on your consent (you actively initiate each recording session), contractual necessity (to provide the bug reporting service you requested), and legitimate interests (to maintain and improve our service and ensure security).
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How Data Is Stored</h2>
        <p className="mb-4">
          All recorded data is stored locally in your browser until you choose to submit it. Recordings never leave your device until you click "Submit." You can review and delete recordings before submission, and unsubmitted drafts can be deleted anytime from the extension.
        </p>
        <p className="mb-4">
          When you submit a bug report, data is transmitted securely via HTTPS to our servers in the European Union. Reports are associated with your authenticated account, and only you and authorized team members can access your reports.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <p className="mb-4">
          Local drafts remain stored until you delete them or clear your browser data. Submitted reports are retained while your account is active or as configured by your organization. You can request deletion of your data at any time by contacting <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Processing</h2>
        <p className="mb-4">
          Your data is stored in the European Union. We use third-party service providers (such as AI services for analyzing recordings) that process data on our behalf. We ensure appropriate safeguards are in place for such processing in compliance with GDPR.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
        <p className="mb-4">
          We do not sell your data to third parties, share data with advertisers, use your data for purposes unrelated to bug reporting, or use your data to determine creditworthiness.
        </p>
        <p className="mb-4">
          We share data with your organization's team members based on project permissions, with service providers who help operate our service (such as cloud hosting and analytics) under data protection agreements, in connection with a merger, acquisition, or sale of assets (you will be notified), and when required by law.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
        <p className="mb-4">
          You have the right to access and view your recorded data before submission, delete recordings and request deletion of submitted reports, export your data in a portable format, withdraw consent by stopping use of the extension at any time, and lodge a complaint with your local data protection authority if you believe your rights have been violated.
        </p>
        <p className="mb-4">
          To exercise these rights, contact <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">California Privacy Rights (CCPA)</h2>
        <p className="mb-4">
          California residents have additional rights: the right to know what personal information we collect and how it is used, the right to request deletion of personal information, the right to opt-out of sale (we do not sell personal information), and the right to non-discrimination for exercising these rights.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">European Users (GDPR)</h2>
        <p className="mb-4">
          As a Germany-based company, we are committed to GDPR compliance. If you are in the European Economic Area, you have additional rights including rectification of inaccurate personal data, restriction of processing, objection to processing based on legitimate interests, and data portability.
        </p>
        <p className="mb-4">
          Our legal bases for processing are consent (Art. 6(1)(a)), contract performance (Art. 6(1)(b)), and legitimate interests (Art. 6(1)(f)).
        </p>
        <p className="mb-4">
          To exercise these rights or lodge a complaint, contact <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a> or your local supervisory authority. In Germany, this is the Bayerisches Landesamt für Datenschutzaufsicht (BayLDA).
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Protection Features</h2>
        <p className="mb-4">
          The extension automatically redacts sensitive information including passwords, authentication tokens, API keys, credit card numbers, and authorization headers.
        </p>
        <p className="mb-4">
          You also have manual privacy controls: Blur Mode lets you select page elements to hide in your recording, Audio Toggle lets you choose whether to include voice narration, Pre-submission Review lets you preview exactly what will be sent before submitting, and Draft Deletion lets you remove any recording at any time.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p className="mb-4">
          We protect your data through HTTPS encryption for all data transmission, secure authentication via industry-standard protocols, and origin validation to prevent unauthorized access.
        </p>
        <p className="mb-4">
          No system is perfectly secure. While we use industry-standard security measures, we cannot guarantee that unauthorized access, data loss, or breaches will never occur.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="mb-4">
          meetio is not intended for use by children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Chrome Web Store Compliance</h2>
        <p className="mb-4">
          meetio's use of information received from Google APIs adheres to the <a href="https://developer.chrome.com/docs/webstore/program-policies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome Web Store User Data Policy</a>, including the Limited Use requirements.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="mb-4">
          We update this privacy policy when our practices change or when required by law. We notify you of significant changes through the extension or via email.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          For questions about this privacy policy or your data, email <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a> or visit <a href="https://meetio.ai" className="text-primary hover:underline">https://meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <p className="text-gray-500 text-sm italic">
        This privacy policy is provided for informational purposes. For legal advice, consult with a qualified attorney.
      </p>
    </div>
  );
};

export default Datenschutz;
