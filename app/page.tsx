"use client"

import { useState } from "react"
import { PageTitle } from "@/components/PageTitle"
import { IntroCopy } from "@/components/IntroCopy"
import { AppointmentForm } from "@/components/AppointmentForm"
import { ThankYou } from "@/components/ThankYou"

export default function Home() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <PageTitle
        title="Request an Appointment"
        subtitle="Complete the form below to schedule your federal retirement consultation."
      />
      <main>
        {submitted ? (
          <ThankYou />
        ) : (
          <>
            <IntroCopy />
            <AppointmentForm onSuccess={() => setSubmitted(true)} />
          </>
        )}
      </main>
    </>
  )
}
