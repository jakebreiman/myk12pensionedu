"use client"

import { useState } from "react"
import { IntroCopy } from "@/components/IntroCopy"
import { AppointmentForm } from "@/components/AppointmentForm"
import { ThankYou } from "@/components/ThankYou"

export default function Home() {
  const [submitted, setSubmitted] = useState(false)

  return (
      <main className="max-w-[980px] mx-auto">
        {submitted ? (
          <ThankYou />
        ) : (
          <>
            <div className="md:grid md:grid-cols-[2fr_3fr] md:items-start">
              <IntroCopy />
              <AppointmentForm onSuccess={() => setSubmitted(true)} />
            </div>
            <div className="px-5 py-5">
              <p className="text-xs text-[#555] leading-relaxed">
                <strong>Notice:</strong> All licensed representatives are not employed by or affiliated
                with any federal agency, government pension program, or federal organization.
                Information provided during this appointment is for educational purposes only and does
                not constitute financial or legal advice.
              </p>
            </div>
          </>
        )}
      </main>
  )
}
