# Design Spec: MyFedPensionEdu.com — Appointment Scheduling One-Pager

**Date:** 2026-03-16
**Status:** Approved

> **Note:** This spec supersedes any conflicting guidance in CLAUDE.md. CLAUDE.md describes initial intent; this document reflects the approved design after the visual brainstorming session.

---

## Overview

A single-page appointment scheduling website for federal employees and retirees. The site must feel institutional, plain, and trustworthy — modeled visually after USA.gov / OPM.gov (USWDS-inspired), not a modern SaaS or marketing landing page.

**Primary goal:** Help a visitor understand the purpose of the page and submit a form to request an appointment.

---

## Visual Design

### Color Palette
- Header/footer background: `#112e51` (deep navy)
- Nav accent / button / form heading: `#205493` (federal blue)
- Header bottom border: `4px solid #205493`
- Page title bar background: `#f1f6fb`, border: `#c8d8ea`
- Form box background: `#f8fbfe`, border: `#c8d8ea`
- Intro copy panel: `#f4f7fb` background, `#d0dcea` border, `box-shadow: 0 2px 6px rgba(32, 84, 147, 0.08)`
- Disclaimer panel: `#e8f0fa` background, `#b8cce4` border
- Input borders: `#a0b8cc`
- Body text: `#1a1a1a` / `#222`
- Error red: `#c0392b`

### Typography
- Font: system sans-serif stack — `Arial, Helvetica, sans-serif` throughout
- Replace the default Geist font with system sans in `app/layout.tsx`
- No custom display fonts, no serifs

### Layout
- Centered, `max-width: 620px`, white background
- Mobile-first: two-column field grids collapse to single column on small screens (`grid-cols-1 sm:grid-cols-2`)
- No navigation bar
- No phone number anywhere on the page

---

## Page Structure

From top to bottom:

1. **Top disclaimer banner** — dark navy (`#112e51`), small text, lock icon
2. **Header** — white background, logo/tagline, 4px blue bottom border
3. **Page title bar** — light blue-gray, `h1` heading + subtitle
4. **Main content area:**
   a. Intro copy panel (shadowed)
   b. Appointment form (or thank-you state after submission)
5. **Footer** — dark navy, copyright + Privacy Policy + Terms of Use links only

There is no hero section with bullets or a scroll-to-form CTA. The page leads directly with the intro copy and form. This was decided during the visual design session.

---

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Main appointment scheduling page |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy (placeholder copy) |
| `/terms` | `app/terms/page.tsx` | Terms of Use (placeholder copy) |

---

## Architecture

### Layout (`app/layout.tsx`)
Server component. Contains:
- Metadata (title: "MyFedPensionEdu.com — Federal Retirement Appointment Scheduling", description: "Schedule a one-on-one federal retirement consultation.")
- Font: system sans (remove Geist)
- Renders `<Header />`, `{children}`, `<Footer />`
- Renders `<UTMCapture />` client component (see below)

### Components

| Component | Location | Purpose |
|---|---|---|
| `Header` | `components/Header.tsx` | Top banner + logo/tagline block |
| `Footer` | `components/Footer.tsx` | Dark navy footer, copyright + policy links |
| `PageTitle` | `components/PageTitle.tsx` | Light blue-gray title bar, accepts `title` and `subtitle` props |
| `IntroCopy` | `components/IntroCopy.tsx` | Shadowed panel with three intro paragraphs |
| `AppointmentForm` | `components/AppointmentForm.tsx` | Full single-step form — RHF + Zod |
| `ThankYou` | `components/ThankYou.tsx` | Confirmation state shown after successful submission |
| `UTMCapture` | `components/UTMCapture.tsx` | `"use client"` component; reads UTM params from URL on mount, stores to `sessionStorage` |

### `Header` internals
- Sub-component 1: Top disclaimer banner — `<div>` with `#112e51` background, lock icon (Unicode `🔒` or SVG), text: "An independent educational resource for federal employees — not affiliated with any government agency"
- Sub-component 2: Logo block — site name `MyFedPensionEdu.com` (bold, `#112e51`) + tagline "Federal Retirement Education & Appointment Scheduling" (`#666`), separated from the above by `4px solid #205493` bottom border on the white block

### Page composition (`app/page.tsx`)

```tsx
"use client"

export default function Home() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <PageTitle
        title="Request an Appointment"
        subtitle="Complete the form below to schedule your federal retirement consultation."
      />
      <main>
        {submitted
          ? <ThankYou />
          : <>
              <IntroCopy />
              <AppointmentForm onSuccess={() => setSubmitted(true)} />
            </>
        }
      </main>
    </>
  )
}
```

Note: `<ThankYou />` replaces both the intro copy and the form. Do not render `<IntroCopy />` on the thank-you state.

(`<Header />` and `<Footer />` are rendered by `app/layout.tsx`)

### Privacy and Terms pages
- `app/privacy/page.tsx`: `<PageTitle title="Privacy Policy" subtitle="Last updated: March 2026" />` + placeholder body text
- `app/terms/page.tsx`: `<PageTitle title="Terms of Use" subtitle="Last updated: March 2026" />` + placeholder body text

---

## `<IntroCopy />` Content

The three paragraphs in the shadowed panel:

> Book your one-on-one complimentary consultation regarding your federal retirement benefit questions.

> During your appointment you will receive educational information on how to best understand your specific federal retirement options. You will also receive information about your expected retirement income, benefit timing, and related considerations under FERS or CSRS.

> Please indicate whether you prefer a phone call or Zoom teleconference in the notes section below. Please also confirm your direct cell phone number.

---

## UTM Capture (`<UTMCapture />`)

A `"use client"` component that renders `null`. On mount (`useEffect`), reads the following params from `window.location.search` and stores each to `sessionStorage` if present:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

The `<AppointmentForm />` reads these from `sessionStorage` when building the submit payload.

---

## Form

### Schema file: `lib/appointmentSchema.ts`
Defines the Zod v4 schema (use Zod v4 API — the project uses `zod@^4.3.6`).

### Fields

| Field | Type | Required | Validation |
|---|---|---|---|
| Full Name | text | yes | min 2 chars |
| Work Email | email | yes | valid email format |
| Personal Email | email | no | valid email or empty string |
| Mobile Number | tel | yes | matches `/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/` (accepts `5555555555`, `555-555-5555`, `(555) 555-5555`) |
| Agency / Employer | text | yes | min 2 chars |
| Department / Office | text | yes | min 2 chars |
| Job Title | text | no | — |
| State | select | yes | must be one of the 50 states + DC enum |
| Appointment Type | select | yes | `"phone"` or `"zoom"` |
| Meeting Date | date | yes | must be today or later (same-day appointments allowed); no max date enforced |
| Meeting Time | select | yes | see time slot list below |
| Timezone | select | yes | see timezone list below |
| Message | textarea | no | max 1000 chars |
| Consent | checkbox | yes | must be `true` |

### Appointment Type options
```
{ value: "phone", label: "Phone Call" }
{ value: "zoom",  label: "Zoom (Video Call)" }
```

### Meeting Time options
30-minute slots, 8:00 AM – 6:00 PM (last slot 5:30 PM), 12-hour display format:
```
8:00 AM, 8:30 AM, 9:00 AM, 9:30 AM, 10:00 AM, 10:30 AM,
11:00 AM, 11:30 AM, 12:00 PM, 12:30 PM, 1:00 PM, 1:30 PM,
2:00 PM, 2:30 PM, 3:00 PM, 3:30 PM, 4:00 PM, 4:30 PM,
5:00 PM, 5:30 PM
```

### Timezone options
```
{ value: "America/New_York",    label: "Eastern Time (ET)" }
{ value: "America/Chicago",     label: "Central Time (CT)" }
{ value: "America/Denver",      label: "Mountain Time (MT)" }
{ value: "America/Phoenix",     label: "Mountain Time – Arizona (no DST)" }
{ value: "America/Los_Angeles", label: "Pacific Time (PT)" }
{ value: "America/Anchorage",   label: "Alaska Time (AKT)" }
{ value: "Pacific/Honolulu",    label: "Hawaii Time (HT)" }
```

### Submit behavior

1. User clicks "Submit Request"
2. RHF triggers Zod validation
3. If invalid: show inline error messages below each invalid field (rendered as `<p role="alert" className="text-red-600 text-xs mt-1">`)
4. If valid:
   - Disable submit button, show "Submitting..." text on button
   - Build payload: all form fields + UTM params from `sessionStorage`
   - Call mock submit handler: `console.log(payload)` + `await new Promise(r => setTimeout(r, 500))`
   - On mock success: call `onSuccess()` prop → parent swaps form for `<ThankYou />`
   - On error (thrown exception): re-enable button, show form-level error banner above the submit button: "There was a problem submitting your request. Please try again."
   - TODO: replace mock handler with real CRM/webhook integration

### Field layout (mobile-first)

- Full Name: full width
- Work Email + Personal Email: `sm:grid-cols-2`, stacked on mobile
- Mobile Number: full width
- Agency / Employer: full width
- Department / Office + Job Title: `sm:grid-cols-2`, stacked on mobile
- State (1fr) + Appointment Type (2fr): `sm:grid-cols-[1fr_2fr]`, stacked on mobile
- Meeting Date + Time + Timezone: `sm:grid-cols-3`, stacked on mobile
- Message: full width
- Disclaimer panel: full width (between Message and Consent)
- Consent: full width
- Submit button: full width

**Mobile note:** `<input type="date">` renders the native OS date picker on mobile — this is acceptable behavior for the current scope. Calendly/GHL will replace date/time/timezone fields in a future integration.

---

## Thank-You State

Replace the entire form (and intro copy) with:

```
Your request has been received.

A representative will contact you to confirm your appointment.
Please check your email for further information.
```

Plain text, same layout container width, no icons, no celebratory language. Centered vertically within a simple bordered box.

---

## Integration TODOs (in-code comments)

```tsx
// TODO: Meta Pixel — add fbq('track', 'Lead') on successful form submission
// TODO: CRM sync — POST form payload to GoHighLevel or HubSpot webhook
// TODO: Confirmation email — trigger via CRM or transactional email provider
// TODO: Confirmation SMS — trigger via CRM or Twilio
// TODO: Calendar booking — replace Meeting Date/Time/Timezone fields with Calendly or GHL calendar embed
```

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<form>`, `<label htmlFor="...">`
- All inputs have visible `<label>` elements — no placeholder-only labeling
- Error messages: `<p role="alert">` below each invalid field
- Consent checkbox: keyboard-accessible, `<label>` wraps text
- Color contrast: navy on white, white on navy — meets WCAG AA
- Heading hierarchy: `<h1>` in `<PageTitle>`, `<h2>` for form section heading

---

## `.gitignore` addition

Add `.superpowers/` to `.gitignore`.
