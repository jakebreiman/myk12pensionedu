import type { Metadata } from "next"
import { PageTitle } from "@/components/PageTitle"

export const metadata: Metadata = {
  title: "Terms of Use — MyFedPensionEdu.com",
}

export default function TermsPage() {
  return (
    <>
      <PageTitle title="Terms of Use" subtitle="Last updated: March 2026" />
      <main className="max-w-[620px] mx-auto px-5 py-8 text-sm text-[#222] leading-relaxed space-y-6">
        <p className="text-gray-500 italic">
          These terms of use will be updated with complete legal terms before this site goes live.
        </p>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">Acceptance of Terms</h2>
          <p>
            By accessing this website and submitting an appointment request, you agree to these
            terms of use. If you do not agree, please do not use this site.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">Educational Purpose</h2>
          <p>
            The information provided through this website and during any scheduled appointment is
            for educational purposes only. It does not constitute financial, legal, or investment
            advice. All licensed representatives are independent and are not employed by or
            affiliated with any federal agency or government organization.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">No Government Affiliation</h2>
          <p>
            MyFedPensionEdu.com is an independent educational resource. It is not affiliated with,
            endorsed by, or operated by the federal government, the Office of Personnel Management,
            or any other government entity.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">Contact</h2>
          <p>
            For questions regarding these terms, please contact us through the appointment
            scheduling form on the{" "}
            <a href="/" className="text-[#205493] underline">
              home page
            </a>
            .
          </p>
        </section>
      </main>
    </>
  )
}
