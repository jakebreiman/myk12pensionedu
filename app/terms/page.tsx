import type { Metadata } from "next"
import { PageTitle } from "@/components/PageTitle"

export const metadata: Metadata = {
  title: "Terms of Use — MyFedPensionEdu.com",
}

export default function TermsPage() {
  return (
    <>
      <PageTitle title="Terms of Use" subtitle="Last Updated: January 2026" />
      <main className="max-w-[620px] mx-auto px-5 py-8 text-sm text-[#222] leading-relaxed space-y-6">

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">1. Acceptance of Terms</h2>
          <p>
            Users must be 18 or older to access this service. By using this site you agree to these
            Terms of Use, including mandatory arbitration provisions that limit available remedies.
            Continued use of the site indicates acceptance of any revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">2. User Registration</h2>
          <p>
            Users must provide accurate information and keep their details current. By submitting a
            form, you agree to receive electronic and appointment-related communications. You may opt
            out at any time.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">3. SMS Program</h2>
          <p>
            Users who opt in may receive appointment-related text messages. Reply <strong>STOP</strong> to
            unsubscribe or <strong>HELP</strong> for assistance. Standard messaging rates may apply.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">4. Appointments and Release</h2>
          <p>
            MyFedPensionEdu.com operates as an appointment scheduling and educational resource only.
            It is not affiliated with any licensed agents or service providers. Users release
            MyFedPensionEdu.com from any disputes arising with agents or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">5. Educational Purpose</h2>
          <p>
            All information provided through this website and during any scheduled appointment is
            for educational purposes only. It does not constitute financial, legal, or investment
            advice. All licensed representatives are independent and not employed by or affiliated
            with any federal agency, government pension program, or government organization.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">6. No Government Affiliation</h2>
          <p>
            MyFedPensionEdu.com is an independent educational resource. It is not affiliated with,
            endorsed by, or operated by the federal government, the Office of Personnel Management,
            or any other government entity.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">7. Content Rights</h2>
          <p>
            Users receive a limited, non-exclusive license to access the site for personal use only.
            MyFedPensionEdu.com retains all intellectual property rights to site content.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">8. User Content</h2>
          <p>
            Users are solely responsible for any content they submit. We disclaim liability for
            damages arising from misuse of submitted content by third parties.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">9. General Disclaimers</h2>
          <p>
            Services are provided "as is" with no warranties. We do not control the quality or
            accuracy of information provided by representatives and cannot confirm the truthfulness
            of their communications.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">10. Liability Limits</h2>
          <p>
            Our maximum liability is capped at one hundred dollars ($100) regardless of the nature
            or amount of damages claimed.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">11. Arbitration</h2>
          <p>
            All disputes shall be resolved through binding arbitration — not court proceedings.
            By using this site, you waive your right to a jury trial and to participate in any
            class action lawsuit.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">12. Governing Law</h2>
          <p>
            These Terms of Use are governed by applicable state law.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">13. Contact</h2>
          <p>
            For questions regarding these terms, please contact us through the appointment
            scheduling form on the{" "}
            <a href="/" className="text-[#205493] underline">home page</a>.
          </p>
        </section>

      </main>
    </>
  )
}
