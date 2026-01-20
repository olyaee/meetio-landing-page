import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">meetio Privacy Policy</h1>
      <p className="text-gray-600 mb-8 text-center"><strong>Last updated: January 20, 2025</strong></p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="mb-4">
          meetio is a voice-powered bug reporting tool. We only collect data when you actively start a recording. Your recordings stay on your device until you choose to submit them. We don't sell your data or use it for advertising.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Controller</h2>
        <p className="mb-4">
          meetio is operated by <strong>meetio.ai</strong>, located at Stiftsbogen 144, 81375 Munich, Germany.
        </p>
        <p className="mb-4">
          For privacy inquiries: <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Collect</h2>
        <p className="mb-4">
          The meetio extension collects data <strong>only when you actively initiate a recording</strong>. We do not collect any data in the background.
        </p>

        <h3 className="text-xl font-semibold mb-3">During Recording Sessions</h3>
        <p className="mb-4">When you click "Start Recording," the extension captures:</p>

        <h4 className="text-lg font-semibold mb-2">1. Screen Activity</h4>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Visual snapshots of the webpage you're viewing</li>
          <li>User interactions (clicks, scrolls, typing)</li>
          <li>Page changes and navigation</li>
          <li>Text input is masked by default in form fields</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">2. Audio (Optional)</h4>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Microphone audio for voice narration</li>
          <li>Only captured if you enable audio AND grant microphone permission</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">3. Network Activity</h4>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>HTTP requests and responses (URLs, status codes, timing)</li>
          <li>Request/response headers (excluding sensitive headers)</li>
          <li>Request/response bodies (size-limited)</li>
          <li>Sensitive data is automatically redacted</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">4. System Context</h4>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Browser name and version</li>
          <li>Operating system</li>
          <li>Screen resolution</li>
          <li>Page URL and title</li>
          <li>Timezone and language</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">5. Screenshots</h4>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Thumbnail images for visual preview</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">What We Do NOT Collect</h3>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>GPS location or geolocation data</li>
          <li>Webcam or camera footage</li>
          <li>Files from your computer</li>
          <li>Browsing history outside of the recorded session</li>
          <li>Data from other tabs or windows</li>
          <li>Passwords, tokens, or credentials (automatically redacted)</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
        <p className="mb-4">We use your data solely to:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Provide the bug reporting service you requested</li>
          <li>Display recordings for review before submission</li>
          <li>Store and deliver submitted bug reports to your team</li>
          <li>Improve our service</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
        <p className="mb-4">We process your data based on:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Consent</strong>: You actively initiate each recording session</li>
          <li><strong>Contractual necessity</strong>: To provide the bug reporting service you requested</li>
          <li><strong>Legitimate interests</strong>: To maintain and improve our service, prevent fraud, and ensure security</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How Data Is Stored</h2>

        <h3 className="text-xl font-semibold mb-3">Local Storage (On Your Device)</h3>
        <p className="mb-4">
          All recorded data is stored locally in your browser's secure storage until you choose to submit it:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Recordings never leave your device until you click "Submit"</li>
          <li>You can review and delete recordings before submission</li>
          <li>Unsubmitted drafts can be deleted anytime from the extension</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">After Submission</h3>
        <p className="mb-4">When you submit a bug report:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Data is transmitted securely via HTTPS to our servers</li>
          <li>Reports are associated with your authenticated account</li>
          <li>Only you and authorized team members can access your reports</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Local drafts</strong>: Stored until you delete them or clear browser data</li>
          <li><strong>Submitted reports</strong>: Retained while your account is active, or as configured by your organization</li>
          <li><strong>Account data</strong>: Retained while your account is active</li>
        </ul>
        <p className="mb-4">You can request deletion of your data at any time.</p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Processing</h2>
        <p className="mb-4">
          Your data is stored in the European Union. We use third-party service providers (e.g., AI services for analyzing recordings) that may process data outside the EU. We ensure appropriate safeguards are in place for such processing in compliance with GDPR.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
        <p className="mb-4"><strong>We do NOT:</strong></p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Sell your data to third parties</li>
          <li>Share data with advertisers</li>
          <li>Use your data for purposes unrelated to bug reporting</li>
          <li>Use your data to determine creditworthiness</li>
        </ul>

        <p className="mb-4"><strong>We may share data:</strong></p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>With your organization's team members (based on project permissions)</li>
          <li>With service providers who help operate our service (e.g., cloud hosting, analytics) under data protection agreements</li>
          <li>In connection with a merger, acquisition, or sale of assets (you will be notified)</li>
          <li>When required by law</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Access</strong>: View your recorded data before submission</li>
          <li><strong>Delete</strong>: Remove recordings and request deletion of submitted reports</li>
          <li><strong>Portability</strong>: Export your data</li>
          <li><strong>Withdraw consent</strong>: Stop using the extension at any time</li>
          <li><strong>Lodge a complaint</strong>: Contact your local data protection authority if you believe your rights have been violated</li>
        </ul>
        <p className="mb-4">
          To exercise these rights, contact us at <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">California Privacy Rights (CCPA)</h2>
        <p className="mb-4">If you are a California resident, you have additional rights:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Right to know</strong>: What personal information we collect and how it's used</li>
          <li><strong>Right to delete</strong>: Request deletion of your personal information</li>
          <li><strong>Right to opt-out</strong>: We do not sell personal information</li>
          <li><strong>Right to non-discrimination</strong>: We will not discriminate against you for exercising these rights</li>
        </ul>
        <p className="mb-4">
          To exercise these rights, contact <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">European Users (GDPR)</h2>
        <p className="mb-4">
          As a Germany-based company, we are committed to GDPR compliance. If you are in the European Economic Area, you have additional rights:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Rectification</strong>: Correct inaccurate personal data</li>
          <li><strong>Restriction</strong>: Request we limit processing of your data</li>
          <li><strong>Objection</strong>: Object to processing based on legitimate interests</li>
          <li><strong>Data portability</strong>: Receive your data in a structured, machine-readable format</li>
        </ul>
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

        <h3 className="text-xl font-semibold mb-3">Automatic Redaction</h3>
        <p className="mb-4">The extension automatically redacts sensitive information:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Passwords and authentication tokens</li>
          <li>API keys and secrets</li>
          <li>Credit card numbers</li>
          <li>Authorization headers and cookies</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Manual Privacy Controls</h3>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Blur Mode</strong>: Select page elements to blur in your recording</li>
          <li><strong>Audio Toggle</strong>: Choose whether to include voice narration</li>
          <li><strong>Pre-submission Review</strong>: Preview what will be sent before submitting</li>
          <li><strong>Draft Deletion</strong>: Delete any recording at any time</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p className="mb-4">We protect your data through:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>HTTPS encryption for all data transmission</li>
          <li>Secure authentication via industry-standard protocols</li>
          <li>Origin validation to prevent unauthorized access</li>
        </ul>
        <p className="mb-4">
          <strong>No system is perfectly secure.</strong> While we use industry-standard security measures, we cannot guarantee that unauthorized access, data loss, or breaches will never occur.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="mb-4">
          meetio is not intended for use by children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a>.
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
        <h2 className="text-2xl font-semibold mb-4">Permissions Explained</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Permission</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Why We Need It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>activeTab</code></td>
                <td className="border border-gray-300 px-4 py-2">To record the webpage you're currently viewing when you start a recording</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>storage</code></td>
                <td className="border border-gray-300 px-4 py-2">To save your drafts and preferences locally on your device</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>offscreen</code></td>
                <td className="border border-gray-300 px-4 py-2">Required by Chrome to access microphone for audio recording</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>scripting</code></td>
                <td className="border border-gray-300 px-4 py-2">To display the recording interface and capture page content</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>Host permissions</code></td>
                <td className="border border-gray-300 px-4 py-2">To enable recording on any website where you want to report a bug</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          <strong>Note on Host Permissions</strong>: The "all URLs" permission is required because bug reports can be filed from any webpage. We do NOT run code on pages you're not recording, collect data in the background, or access other tabs.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify you of significant changes through the extension or via email.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">For questions about this privacy policy or your data:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Email</strong>: <a href="mailto:founders@meetio.ai" className="text-primary hover:underline">founders@meetio.ai</a></li>
          <li><strong>Website</strong>: <a href="https://meetio.ai" className="text-primary hover:underline">https://meetio.ai</a></li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <p className="text-gray-500 text-sm italic">
        This privacy policy is provided for informational purposes. For legal advice, consult with a qualified attorney.
      </p>
    </div>
  );
};

export default Datenschutz;
