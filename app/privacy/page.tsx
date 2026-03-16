import type { Metadata } from "next"
import { PageTitle } from "@/components/PageTitle"

export const metadata: Metadata = {
  title: "Privacy Policy — MyFedPensionEdu.com",
}

export default function PrivacyPage() {
  return (
    <>
      <PageTitle title="Privacy Policy" subtitle="Last Updated: January 2026" />
      <main className="max-w-[620px] mx-auto px-5 py-8 text-sm text-[#222] leading-relaxed space-y-6">

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">1. Acceptance of Privacy Policy</h2>
          <p>
            Welcome to MyFedPensionEdu.com. By accessing this service, you agree to be bound by this
            Privacy Policy. We process personal information in compliance with applicable privacy laws
            including the CCPA, GDPR, UK GDPR, and PIPEDA.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">2. Information Collected</h2>
          <p className="mb-2"><strong>Directly from You:</strong></p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Email addresses and phone numbers</li>
            <li>Agency, department, and employment information</li>
            <li>Unique identifiers and message content</li>
          </ul>
          <p className="mb-2"><strong>Automatically Collected:</strong></p>
          <p>
            We collect traffic data including IP addresses, browser type, pages visited, time spent
            on site, and device information through tracking technologies.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">3. Collection Methods</h2>
          <p>
            Information is gathered through interactive tools and services, free-form text
            submissions, location-enabled browsers, cookies, web beacons, analytics tools, and
            contact form submissions.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">4. Tracking Tools and Advertising</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cookies:</strong> Used for authentication, preferences, analytics, and fraud prevention.</li>
            <li><strong>Web Beacons:</strong> Tiny image files that track service usage and email engagement.</li>
            <li><strong>Analytics:</strong> Third-party services monitor user interactions.</li>
            <li><strong>Mobile Device Identifiers:</strong> Track app usage and activities.</li>
            <li><strong>Behavioral Advertising:</strong> Partners may display interest-based ads; users can opt out via NAI or DAA platforms.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">5. How Information Is Used</h2>
          <p>
            Data is used to provide services, send appointment confirmations and reminders, improve
            the platform, display targeted ads, fulfill legal obligations, and prevent fraud. Phone
            numbers are shared only with service providers fulfilling appointments — never for
            unrelated marketing.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">6. Information Sharing</h2>
          <p>
            Information may be shared with third-party service providers, operational partners,
            advertising partners, and device-matching partners. Data may be transferred during
            mergers or acquisitions and disclosed when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">7. Security</h2>
          <p>
            No security measures are perfect or impenetrable, and we cannot guarantee perfect
            security. Information sent electronically may not remain secure during transmission.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">8. User Choices</h2>
          <p className="mb-2">
            <strong>California Residents:</strong> You have rights to know what data is collected,
            request deletion, and receive notice of data sales.
          </p>
          <p>
            <strong>EU, UK, and Canadian Residents:</strong> You may request data copies,
            corrections, erasures, consent withdrawal, processing restrictions, and lodge complaints
            with supervisory authorities.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">9. Data Retention</h2>
          <p>
            We retain your information as long as necessary to provide services, comply with legal
            obligations, resolve disputes, and prevent fraud.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">10. Children</h2>
          <p>
            This service is prohibited for users under 18. Parents may use it on behalf of minor
            children.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">11. Third-Party Links</h2>
          <p>
            We are not responsible for external websites' privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">12. Policy Updates</h2>
          <p>
            Changes will be posted on this page. Continued use of the site indicates acceptance of
            the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">13. Contact Information</h2>
          <p>
            For questions regarding this privacy policy, please contact us through the appointment
            scheduling form on the{" "}
            <a href="/" className="text-[#205493] underline">home page</a>.
          </p>
        </section>

      </main>
    </>
  )
}
