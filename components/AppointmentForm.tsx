"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { appointmentSchema, type AppointmentFormData } from "@/lib/appointmentSchema"
import {
  US_STATES,
  APPOINTMENT_TYPES,
  MEETING_TIMES,
  TIMEZONES,
} from "@/lib/formOptions"

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="text-[#c0392b] text-xs mt-1">
      {message}
    </p>
  )
}

const inputClass =
  "w-full border border-[#a0b8cc] bg-white px-3 h-10 text-sm focus:outline-none focus:border-[#205493]"

const selectClass =
  "w-full border border-[#a0b8cc] bg-white px-3 h-10 text-sm focus:outline-none focus:border-[#205493] cursor-pointer"

interface AppointmentFormProps {
  onSuccess: () => void
}

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [formError, setFormError] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      consent: false,
    },
  })

  async function onSubmit(data: AppointmentFormData) {
    setFormError(null)
    setCaptchaError(null)

    const captchaToken = recaptchaRef.current?.getValue()
    if (!captchaToken) {
      setCaptchaError("Please complete the CAPTCHA verification.")
      return
    }

    try {
      // Collect UTM params from sessionStorage
      const utmParams: Record<string, string> = {}
      UTM_KEYS.forEach((key) => {
        const value = sessionStorage.getItem(key)
        if (value) utmParams[key] = value
      })

      const payload = { ...data, ...utmParams, captchaToken }

      // TODO: Meta Pixel — add fbq('track', 'Lead') on successful form submission
      // TODO: CRM sync — POST payload to GoHighLevel or HubSpot webhook
      // TODO: Confirmation email — trigger via CRM or transactional email provider
      // TODO: Confirmation SMS — trigger via CRM or Twilio
      // TODO: Calendar booking — replace Meeting Date/Time/Timezone fields with Calendly or GHL embed

      // Mock submit
      console.log("Appointment form submission payload:", payload)
      await new Promise((r) => setTimeout(r, 500))

      onSuccess()
    } catch {
      setFormError(
        "There was a problem submitting your request. Please try again."
      )
    }
  }

  return (
    <div className="px-5 py-5 pb-8">
      <div className="border border-[#c8d8ea] bg-[#f8fbfe] p-5">
        <h2 className="text-[#205493] font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b border-[#c8d8ea]">
          Schedule Your Appointment
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-[#222] mb-1">
              Full Name <span className="text-[#c0392b]">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Your Full Name"
              {...register("fullName")}
              className={inputClass}
            />
            <FieldError message={errors.fullName?.message} />
          </div>

          {/* Work Email + Personal Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="workEmail" className="block text-xs font-bold text-[#222] mb-1">
                Work Email <span className="text-[#c0392b]">*</span>
              </label>
              <input
                id="workEmail"
                type="email"
                placeholder="Your Work Email"
                {...register("workEmail")}
                className={inputClass}
              />
              <FieldError message={errors.workEmail?.message} />
            </div>
            <div>
              <label htmlFor="personalEmail" className="block text-xs font-bold text-[#222] mb-1">
                Personal Email
              </label>
              <input
                id="personalEmail"
                type="email"
                placeholder="Your Personal Email"
                {...register("personalEmail")}
                className={inputClass}
              />
              <FieldError message={errors.personalEmail?.message} />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block text-xs font-bold text-[#222] mb-1">
              Mobile Number <span className="text-[#c0392b]">*</span>
            </label>
            <input
              id="mobileNumber"
              type="tel"
              placeholder="Your Mobile Number (e.g. 555-555-5555)"
              {...register("mobileNumber")}
              className={inputClass}
            />
            <FieldError message={errors.mobileNumber?.message} />
          </div>

          {/* Agency / Employer */}
          <div>
            <label htmlFor="agencyEmployer" className="block text-xs font-bold text-[#222] mb-1">
              Agency / Employer <span className="text-[#c0392b]">*</span>
            </label>
            <input
              id="agencyEmployer"
              type="text"
              placeholder="Your Agency or Employer"
              {...register("agencyEmployer")}
              className={inputClass}
            />
            <FieldError message={errors.agencyEmployer?.message} />
          </div>

          {/* Department / Office + Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="departmentOffice"
                className="block text-xs font-bold text-[#222] mb-1"
              >
                Department / Office <span className="text-[#c0392b]">*</span>
              </label>
              <input
                id="departmentOffice"
                type="text"
                placeholder="Your Department or Office"
                {...register("departmentOffice")}
                className={inputClass}
              />
              <FieldError message={errors.departmentOffice?.message} />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-xs font-bold text-[#222] mb-1">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                placeholder="Your Job Title"
                {...register("jobTitle")}
                className={inputClass}
              />
            </div>
          </div>

          {/* State + Appointment Type */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-3">
            <div>
              <label htmlFor="state" className="block text-xs font-bold text-[#222] mb-1">
                State <span className="text-[#c0392b]">*</span>
              </label>
              <select id="state" {...register("state")} className={selectClass}>
                <option value="">Select State</option>
                {US_STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.state?.message} />
            </div>
            <div>
              <label
                htmlFor="appointmentType"
                className="block text-xs font-bold text-[#222] mb-1"
              >
                Appointment Type <span className="text-[#c0392b]">*</span>
              </label>
              <select
                id="appointmentType"
                {...register("appointmentType")}
                className={selectClass}
              >
                <option value="">Select Type</option>
                {APPOINTMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.appointmentType?.message} />
            </div>
          </div>

          {/* Scheduling separator */}
          <p className="text-xs text-gray-500 border-t border-[#c8d8ea] pt-4">
            Please select an appointment time from the available options below.
          </p>

          {/* Meeting Date + Time + Timezone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="meetingDate" className="block text-xs font-bold text-[#222] mb-1">
                Meeting Date <span className="text-[#c0392b]">*</span>
              </label>
              <input
                id="meetingDate"
                type="date"
                {...register("meetingDate")}
                className={inputClass}
              />
              <FieldError message={errors.meetingDate?.message} />
            </div>
            <div>
              <label htmlFor="meetingTime" className="block text-xs font-bold text-[#222] mb-1">
                Time <span className="text-[#c0392b]">*</span>
              </label>
              <select id="meetingTime" {...register("meetingTime")} className={selectClass}>
                <option value="">Select</option>
                {MEETING_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <FieldError message={errors.meetingTime?.message} />
            </div>
            <div>
              <label htmlFor="timezone" className="block text-xs font-bold text-[#222] mb-1">
                Timezone <span className="text-[#c0392b]">*</span>
              </label>
              <select id="timezone" {...register("timezone")} className={selectClass}>
                <option value="">Select</option>
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.timezone?.message} />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-[#222] mb-1">
              Message{" "}
              <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Please describe what you'd like to discuss. Include any concerns, goals, or questions you may have."
              {...register("message")}
              className="w-full border border-[#a0b8cc] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#205493] resize-none"
            />
            <FieldError message={errors.message?.message} />
          </div>

          {/* Disclaimer */}
          <div className="bg-[#e8f0fa] border border-[#b8cce4] px-4 py-3 text-xs text-[#333] leading-relaxed text-center">
            <strong>Notice:</strong> All licensed representatives are not employed by or affiliated
            with any federal agency, government pension program, or federal organization. Information
            provided during this appointment is for educational purposes only and does not constitute
            financial or legal advice.
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2.5">
            <input
              id="consent"
              type="checkbox"
              {...register("consent")}
              className="mt-0.5 h-4 w-4 border border-[#a0b8cc] flex-shrink-0 cursor-pointer accent-[#205493]"
            />
            <label htmlFor="consent" className="text-xs text-[#444] leading-relaxed cursor-pointer">
              By clicking Submit below you agree to our{" "}
              <a href="/privacy" className="text-[#205493] underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-[#205493] underline">
                Terms of Use
              </a>
              .
            </label>
          </div>
          <FieldError message={errors.consent?.message} />

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
            />
            {captchaError && (
              <p role="alert" className="text-[#c0392b] text-xs mt-1">
                {captchaError}
              </p>
            )}
          </div>

          {/* Form-level error */}
          {formError && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 px-4 py-3 text-xs text-[#c0392b]"
            >
              {formError}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#205493] text-white text-xs uppercase tracking-widest py-3.5 disabled:opacity-60 cursor-pointer hover:bg-[#1a4478] transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  )
}
