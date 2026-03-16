import type { Metadata } from "next"
import { PageTitle } from "@/components/PageTitle"

export const metadata: Metadata = {
  title: "Privacy Policy — MyFedPensionEdu.com",
}

export default function PrivacyPage() {
  return (
    <>
      <PageTitle title="Privacy Policy" subtitle="Last updated: March 2026" />
      <main className="max-w-[620px] mx-auto px-5 py-8 text-sm text-[#222] leading-relaxed space-y-6">
        <p className="text-gray-500 italic">
          This privacy policy will be updated with complete legal terms before this site goes live.
        </p>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">Information We Collect</h2>
          <p>
            We collect personal information you voluntarily provide when requesting an appointment,
            including your name, email addresses, phone number, and employment information. We may
            also collect technical information such as your IP address and browser type.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">How We Use Your Information</h2>
          <p>
            Your information is used to schedule and confirm your educational appointment, to send
            appointment-related communications, and to improve our services. We do not sell your
            personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">Data Retention</h2>
          <p>
            We retain your information for the duration necessary to fulfill the purposes described
            in this policy, unless a longer retention period is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-[#112e51] font-bold text-base mb-2">Contact</h2>
          <p>
            For questions regarding this privacy policy, please contact us through the appointment
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
