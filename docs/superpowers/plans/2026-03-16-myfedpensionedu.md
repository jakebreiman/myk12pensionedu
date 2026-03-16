# MyFedPensionEdu.com Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page federal retirement appointment scheduling website with a full validated form, thank-you state, and Privacy Policy / Terms of Use pages.

**Architecture:** Next.js 16 App Router, server layout wrapping client page. Shared `<Header />` and `<Footer />` in `app/layout.tsx`. The main page (`app/page.tsx`) is a client component that toggles between the form and thank-you state. Form validation uses React Hook Form v7 + Zod v4 via `@hookform/resolvers/zod`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, React Hook Form v7, Zod v4, `@hookform/resolvers` v5, TypeScript 5.

**Spec:** `docs/superpowers/specs/2026-03-16-myfedpensionedu-design.md`

---

## Chunk 1: Foundation — Schema, Options, Globals, Gitignore

**Files:**
- Create: `lib/formOptions.ts`
- Create: `lib/appointmentSchema.ts`
- Modify: `app/globals.css`
- Modify: `.gitignore`

---

### Task 1: Update `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and append:
```
# Superpowers brainstorming artifacts
.superpowers/
```

- [ ] **Step 2: Commit**
```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorming artifacts"
```

---

### Task 2: Update `app/globals.css`

Remove dark mode overrides and Geist font references. The site is always white-background.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with**

```css
@import "tailwindcss";

body {
  background: #ffffff;
  color: #1a1a1a;
  font-family: Arial, Helvetica, sans-serif;
}
```

- [ ] **Step 2: Verify build compiles**
```bash
npm run build
```
Expected: build succeeds (or only pre-existing errors, none from this change).

- [ ] **Step 3: Commit**
```bash
git add app/globals.css
git commit -m "style: use system sans font, remove dark mode, set white background"
```

---

### Task 3: Create `lib/formOptions.ts`

All static option lists used by the form and schema.

**Files:**
- Create: `lib/formOptions.ts`

- [ ] **Step 1: Create the `lib/` directory**

```bash
mkdir lib
```

- [ ] **Step 2: Create `lib/formOptions.ts`**

```ts
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

export const APPOINTMENT_TYPES = [
  { value: "phone", label: "Phone Call" },
  { value: "zoom", label: "Zoom (Video Call)" },
] as const

export const MEETING_TIMES = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
]

export const TIMEZONES = [
  { value: "America/New_York",    label: "Eastern Time (ET)" },
  { value: "America/Chicago",     label: "Central Time (CT)" },
  { value: "America/Denver",      label: "Mountain Time (MT)" },
  { value: "America/Phoenix",     label: "Mountain Time – Arizona (no DST)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage",   label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu",    label: "Hawaii Time (HT)" },
]
```

- [ ] **Step 2: Verify TypeScript compiles**
```bash
npm run build
```
Expected: no TypeScript errors from this file.

- [ ] **Step 3: Commit**
```bash
git add lib/formOptions.ts
git commit -m "feat: add form option lists (states, timezones, time slots, appointment types)"
```

---

### Task 4: Create `lib/appointmentSchema.ts`

Zod v4 validation schema for the appointment form.

**Files:**
- Create: `lib/appointmentSchema.ts`

- [ ] **Step 1: Create `lib/appointmentSchema.ts`**

```ts
import { z } from "zod"
import { US_STATES, TIMEZONES, MEETING_TIMES, APPOINTMENT_TYPES } from "./formOptions"

const stateValues = US_STATES.map((s) => s.value)
const timezoneValues = TIMEZONES.map((tz) => tz.value)
const timeValues = [...MEETING_TIMES] as [string, ...string[]]
const appointmentTypeValues = APPOINTMENT_TYPES.map((t) => t.value) as [string, ...string[]]

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name"),

  workEmail: z
    .string()
    .min(1, "Work email is required")
    .email("Please enter a valid email address"),

  personalEmail: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.email().safeParse(val).success,
      { error: "Please enter a valid email address" }
    ),

  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(phoneRegex, "Please enter a valid US phone number (e.g. 555-555-5555)"),

  agencyEmployer: z
    .string()
    .min(2, "Please enter your agency or employer"),

  departmentOffice: z
    .string()
    .min(2, "Please enter your department or office"),

  jobTitle: z.string().optional(),

  state: z
    .string()
    .refine((val) => stateValues.includes(val), { message: "Please select your state" }),

  appointmentType: z
    .enum(appointmentTypeValues, { error: "Please select an appointment type" }),

  meetingDate: z
    .string()
    .min(1, "Please select a meeting date")
    .refine((val) => {
      const selected = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selected >= today
    }, "Please select today or a future date"),

  meetingTime: z
    .string()
    .refine((val) => timeValues.includes(val), { message: "Please select a meeting time" }),

  timezone: z
    .string()
    .refine((val) => timezoneValues.includes(val), { message: "Please select a timezone" }),

  message: z
    .string()
    .max(1000, "Message must be 1000 characters or fewer")
    .optional(),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the Privacy Policy and Terms of Use to continue",
    }),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>
```

- [ ] **Step 2: Verify TypeScript compiles**
```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**
```bash
git add lib/appointmentSchema.ts
git commit -m "feat: add Zod v4 appointment form validation schema"
```

---

## Chunk 2: Layout Components — Header, Footer, PageTitle, UTMCapture, layout.tsx

**Files:**
- Create: `components/UTMCapture.tsx`
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/PageTitle.tsx`
- Modify: `app/layout.tsx`

---

### Task 5: Create `components/UTMCapture.tsx`

Client component that silently captures UTM params from the URL into `sessionStorage` on page load.

**Files:**
- Create: `components/UTMCapture.tsx`

- [ ] **Step 1: Create `components/UTMCapture.tsx`**

```tsx
"use client"

import { useEffect } from "react"

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

export function UTMCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    UTM_KEYS.forEach((key) => {
      const value = params.get(key)
      if (value) {
        sessionStorage.setItem(key, value)
      }
    })
  }, [])

  return null
}
```

- [ ] **Step 2: Commit**
```bash
git add components/UTMCapture.tsx
git commit -m "feat: add UTMCapture client component"
```

---

### Task 6: Create `components/Header.tsx`

Top disclaimer banner + logo/tagline block.

**Files:**
- Create: `components/Header.tsx`

- [ ] **Step 1: Create `components/Header.tsx`**

```tsx
export function Header() {
  return (
    <header>
      {/* Top disclaimer banner */}
      <div className="bg-[#112e51] text-[#dce4ef] px-5 py-1.5 text-xs flex items-center gap-2 leading-relaxed">
        <span aria-hidden="true">🔒</span>
        <span>
          An independent educational resource for federal employees — not affiliated with any
          government agency
        </span>
      </div>

      {/* Logo block */}
      <div className="bg-white px-5 py-4 border-b-4 border-[#205493]">
        <div className="max-w-[620px] mx-auto">
          <div className="text-[#112e51] font-bold text-lg tracking-tight">
            MyFedPensionEdu
            <span className="font-normal text-gray-500">.com</span>
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Federal Retirement Education &amp; Appointment Scheduling
          </div>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/Header.tsx
git commit -m "feat: add Header component with disclaimer banner and logo block"
```

---

### Task 7: Create `components/Footer.tsx`

Dark navy footer with copyright and policy links.

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="bg-[#112e51] text-[#7a90b8] py-4 px-5 text-xs text-center">
      <div className="max-w-[620px] mx-auto">
        <p className="mb-2">© 2026 MyFedPensionEdu.com — All Rights Reserved</p>
        <div className="flex justify-center gap-5">
          <a href="/privacy" className="text-[#aabbd4] hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-[#aabbd4] hover:underline">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 8: Create `components/PageTitle.tsx`

Reusable light blue-gray title bar with `h1` heading and optional subtitle.

**Files:**
- Create: `components/PageTitle.tsx`

- [ ] **Step 1: Create `components/PageTitle.tsx`**

```tsx
interface PageTitleProps {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="bg-[#f1f6fb] border-b border-[#c8d8ea] px-5 py-3.5">
      <div className="max-w-[620px] mx-auto">
        <h1 className="text-[#112e51] font-bold text-lg">{title}</h1>
        {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/PageTitle.tsx
git commit -m "feat: add PageTitle component"
```

---

### Task 9: Update `app/layout.tsx`

Replace Geist font with system sans, wire in Header/Footer/UTMCapture.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx` with**

```tsx
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { UTMCapture } from "@/components/UTMCapture"

export const metadata: Metadata = {
  title: "MyFedPensionEdu.com — Federal Retirement Appointment Scheduling",
  description:
    "Schedule a one-on-one federal retirement consultation. Educational information for current and former federal employees.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1a1a1a] antialiased min-h-screen flex flex-col">
        <UTMCapture />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify the build compiles**
```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Run dev server and visually verify the header and footer render**
```bash
npm run dev
```
Open http://localhost:3000. You should see:
- Top dark navy banner with lock icon and disclaimer text
- White logo block with `MyFedPensionEdu.com` and tagline
- 4px blue bottom border under the logo block
- Dark navy footer with copyright and Privacy Policy / Terms of Use links
- Default placeholder page content in between (will be replaced in Chunk 3)

- [ ] **Step 4: Commit**
```bash
git add app/layout.tsx
git commit -m "feat: wire Header, Footer, UTMCapture into root layout; remove Geist font"
```

---

## Chunk 3: Page Content — IntroCopy, ThankYou, AppointmentForm, page.tsx

**Files:**
- Create: `components/IntroCopy.tsx`
- Create: `components/ThankYou.tsx`
- Create: `components/AppointmentForm.tsx`
- Modify: `app/page.tsx`

---

### Task 10: Create `components/IntroCopy.tsx`

Shadowed intro copy panel with the three approved paragraphs.

**Files:**
- Create: `components/IntroCopy.tsx`

- [ ] **Step 1: Create `components/IntroCopy.tsx`**

```tsx
export function IntroCopy() {
  return (
    <div className="max-w-[620px] mx-auto px-5 pt-5">
      <div className="bg-[#f4f7fb] border border-[#d0dcea] shadow-[0_2px_6px_rgba(32,84,147,0.08)] p-5 space-y-3 text-sm text-[#222] leading-relaxed">
        <p>
          Book your one-on-one complimentary consultation regarding your federal retirement benefit
          questions.
        </p>
        <p>
          During your appointment you will receive educational information on how to best understand
          your specific federal retirement options. You will also receive information about your
          expected retirement income, benefit timing, and related considerations under FERS or CSRS.
        </p>
        <p>
          Please indicate whether you prefer a phone call or Zoom teleconference in the notes
          section below. Please also confirm your direct cell phone number.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/IntroCopy.tsx
git commit -m "feat: add IntroCopy component"
```

---

### Task 11: Create `components/ThankYou.tsx`

Plain confirmation state shown after successful form submission.

**Files:**
- Create: `components/ThankYou.tsx`

- [ ] **Step 1: Create `components/ThankYou.tsx`**

```tsx
export function ThankYou() {
  return (
    <div className="max-w-[620px] mx-auto px-5 py-8">
      <div className="border border-[#c8d8ea] bg-[#f8fbfe] p-10 text-center">
        <h2 className="text-[#112e51] font-bold text-lg mb-4">
          Your request has been received.
        </h2>
        <p className="text-[#333] text-sm leading-relaxed">
          A representative will contact you to confirm your appointment.
          <br />
          Please check your email for further information.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/ThankYou.tsx
git commit -m "feat: add ThankYou confirmation component"
```

---

### Task 12: Create `components/AppointmentForm.tsx`

The main form. Uses React Hook Form + Zod. Single-step, all fields, mock submit.

**Files:**
- Create: `components/AppointmentForm.tsx`

- [ ] **Step 1: Create a `FieldError` helper at the top of the file**

This is an inline sub-component — do not create a separate file for it.

- [ ] **Step 2: Create `components/AppointmentForm.tsx`**

```tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
    try {
      // Collect UTM params from sessionStorage
      const utmParams: Record<string, string> = {}
      UTM_KEYS.forEach((key) => {
        const value = sessionStorage.getItem(key)
        if (value) utmParams[key] = value
      })

      const payload = { ...data, ...utmParams }

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
    <div className="max-w-[620px] mx-auto px-5 py-5 pb-8">
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
          <div className="bg-[#e8f0fa] border border-[#b8cce4] px-4 py-3 text-xs text-[#333] leading-relaxed">
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
              By submitting this form you agree to our{" "}
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
```

- [ ] **Step 3: Verify build compiles with no TypeScript errors**
```bash
npm run build
```
Expected: success.

- [ ] **Step 4: Commit**
```bash
git add components/AppointmentForm.tsx
git commit -m "feat: add AppointmentForm component with RHF + Zod validation"
```

---

### Task 13: Update `app/page.tsx`

Wire together IntroCopy, AppointmentForm, ThankYou, and PageTitle into the main page.

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with**

```tsx
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
```

- [ ] **Step 2: Verify build compiles**
```bash
npm run build
```
Expected: success.

- [ ] **Step 3: Run dev server and do a full visual + functional check**
```bash
npm run dev
```
Open http://localhost:3000 and verify:

**Layout:**
- [ ] Dark navy top banner with lock icon
- [ ] White header with `MyFedPensionEdu.com` bold and `.com` in gray, 4px blue bottom border
- [ ] Light blue-gray title bar with "Request an Appointment" h1 and subtitle
- [ ] Shadowed intro copy panel with 3 paragraphs
- [ ] Form in a bordered box with "SCHEDULE YOUR APPOINTMENT" section heading
- [ ] Dark navy footer with Privacy Policy / Terms of Use links

**Form fields (verify all render):**
- [ ] Full Name (required)
- [ ] Work Email (required) + Personal Email (optional) side by side on desktop
- [ ] Mobile Number (required)
- [ ] Agency / Employer (required)
- [ ] Department / Office (required) + Job Title (optional) side by side on desktop
- [ ] State dropdown + Appointment Type dropdown side by side on desktop
- [ ] Separator text before date/time fields
- [ ] Meeting Date + Time + Timezone in 3 columns on desktop
- [ ] Message textarea (optional)
- [ ] Disclaimer panel
- [ ] Consent checkbox with Privacy Policy / Terms links
- [ ] "SUBMIT REQUEST" button full width

**Validation (trigger each):**
- [ ] Submit empty form — verify required field errors appear below each field
- [ ] Enter invalid email in Work Email — verify email error
- [ ] Enter invalid phone (e.g. "abc") — verify phone error
- [ ] Check consent then submit valid data — verify "Submitting..." appears briefly, then ThankYou state shows
- [ ] ThankYou state: verify IntroCopy and form are both gone, confirmation message is shown

**Mobile (resize browser to ~375px):**
- [ ] All 2-column grids collapse to single column
- [ ] All inputs are full width
- [ ] Page is usable at mobile width

- [ ] **Step 4: Commit**
```bash
git add app/page.tsx
git commit -m "feat: wire main page with PageTitle, IntroCopy, AppointmentForm, ThankYou"
```

---

## Chunk 4: Privacy Policy and Terms of Use Pages

**Files:**
- Create: `app/privacy/page.tsx`
- Create: `app/terms/page.tsx`

---

### Task 14: Create `app/privacy/page.tsx`

Privacy Policy page with placeholder copy. Uses shared Header/Footer from layout.

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Create `app/privacy/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify the page renders at `/privacy`**

With dev server running (`npm run dev`), open http://localhost:3000/privacy.
Verify: PageTitle shows "Privacy Policy", header and footer are present, placeholder body text is visible.

- [ ] **Step 3: Commit**
```bash
git add app/privacy/page.tsx
git commit -m "feat: add Privacy Policy page with placeholder copy"
```

---

### Task 15: Create `app/terms/page.tsx`

Terms of Use page with placeholder copy.

**Files:**
- Create: `app/terms/page.tsx`

- [ ] **Step 1: Create `app/terms/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify the page renders at `/terms`**

With dev server running, open http://localhost:3000/terms.
Verify: PageTitle shows "Terms of Use", header and footer are present, placeholder body text is visible.

- [ ] **Step 3: Final full build check**
```bash
npm run build
```
Expected: clean build, no errors.

- [ ] **Step 4: Commit**
```bash
git add app/terms/page.tsx
git commit -m "feat: add Terms of Use page with placeholder copy"
```

---

## Final Verification Checklist

After all tasks are complete:

- [ ] `npm run build` passes cleanly
- [ ] Home page (`/`) renders correctly on desktop and mobile
- [ ] Form validation shows inline errors for all required fields
- [ ] Submitting a valid form shows the ThankYou state (IntroCopy + form disappear)
- [ ] Footer links navigate to `/privacy` and `/terms`
- [ ] Both `/privacy` and `/terms` render with correct header and footer
- [ ] No console errors in the browser
- [ ] No Geist font loaded — system sans is used throughout
