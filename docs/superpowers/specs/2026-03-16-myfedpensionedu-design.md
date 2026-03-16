# Design Spec: MyFedPensionEdu.com — Appointment Scheduling One-Pager

**Date:** 2026-03-16
**Status:** Approved

---

## Overview

A single-page appointment scheduling website for federal employees and retirees. The site must feel institutional, plain, and trustworthy — modeled visually after USA.gov / OPM.gov (USWDS-inspired), not a modern SaaS or marketing landing page.

**Primary goal:** Help a visitor understand the purpose of the page and submit a form to request an appointment.

---

## Visual Design

### Color Palette
- Header/footer background: `#112e51` (deep navy)
- Nav accent / button / form heading: `#205493` (federal blue)
- Header border: `4px solid #205493`
- Page title bar: `#f1f6fb` background, `#c8d8ea` border
- Form box: `#f8fbfe` background, `#c8d8ea` border
- Intro copy panel: `#f4f7fb` background, `#d0dcea` border, `box-shadow: 0 2px 6px rgba(32, 84, 147, 0.08)`
- Disclaimer panel: `#e8f0fa` background, `#b8cce4` border
- Input borders: `#a0b8cc`
- Body text: `#1a1a1a` / `#222`
- Error red: `#c0392b`

### Typography
- Font: `Arial, Helvetica, sans-serif` throughout
- No custom display fonts, no serifs

### Layout
- Centered, `max-width: 620px`, white background
- Mobile-first: two-column field grids collapse to single column on small screens (`grid-cols-1 sm:grid-cols-2`)
- No nav bar
- No phone number in header

### Key UI Patterns
- Top disclaimer banner (dark navy, small text, lock icon)
- Header: logo name + tagline, bordered by 4px blue stripe
- Page title bar: light blue-gray with subtitle
- Intro copy in a shadowed panel
- Form in a bordered box with blue section heading
- Submit button: full-width, `#205493`, uppercase
- Footer: dark navy, centered, Privacy Policy + Terms of Use links only

---

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Main appointment scheduling page |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy |
| `/terms` | `app/terms/page.tsx` | Terms of Use |

---

## Architecture

### Layout (`app/layout.tsx`)
Shared across all routes. Contains:
- Global metadata (title, description)
- Font setup (keep existing Geist or replace with system sans)
- `<Header />` and `<Footer />` components
- Hidden UTM param capture (reads URL params, stores to sessionStorage for form submission)

### Components

| Component | Location | Purpose |
|---|---|---|
| `Header` | `components/Header.tsx` | Top banner + logo/tagline + blue border |
| `Footer` | `components/Footer.tsx` | Dark navy footer with copyright + links |
| `IntroCopy` | `components/IntroCopy.tsx` | Shadowed panel with the three intro paragraphs |
| `AppointmentForm` | `components/AppointmentForm.tsx` | Full form — RHF + Zod, all fields, submit handler |
| `ThankYou` | `components/ThankYou.tsx` | Confirmation state shown after successful submission |
| `PageTitle` | `components/PageTitle.tsx` | Light blue-gray title bar (reusable across pages) |

### Page composition (`app/page.tsx`)
```
<Header />
<PageTitle title="Request an Appointment" subtitle="..." />
<main>
  <IntroCopy />
  {submitted ? <ThankYou /> : <AppointmentForm onSuccess={() => setSubmitted(true)} />}
</main>
<Footer />
```

---

## Form

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | text | yes | |
| Work Email | email | yes | |
| Personal Email | email | no | |
| Mobile Number | tel | yes | |
| Agency / Employer | text | yes | |
| Department / Office | text | yes | |
| Job Title | text | no | |
| State | select | yes | All 50 states + DC |
| Appointment Type | select | yes | "Phone Call", "Zoom (Video Call)" |
| Meeting Date | date | yes | TODO: replace with Calendly/GHL embed |
| Meeting Time | select | yes | 30-min slots, 8am–6pm |
| Timezone | select | yes | All US timezones |
| Message | textarea | no | |
| Consent | checkbox | yes | Must be checked to submit |

**Hidden fields (UTM):** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` — captured from URL on page load and appended to form payload.

### Validation (Zod schema)
- Full Name: min 2 chars
- Work Email: valid email format
- Personal Email: valid email or empty
- Mobile Number: US phone pattern
- Agency / Employer: min 2 chars
- Department / Office: min 2 chars
- State: must select from enum
- Appointment Type: must be "phone" or "zoom"
- Meeting Date: required, must be a future date
- Meeting Time: required
- Timezone: required
- Consent: must be `true`

### Submit behavior
- On submit: validate all fields
- Show inline error messages below each invalid field
- On success: call mock submit handler (console.log payload + simulate 500ms delay)
- After mock success: hide form, show `<ThankYou />` component
- TODO: replace mock handler with real CRM/webhook call (GoHighLevel, HubSpot, etc.)

---

## Thank-You State

Replace the form with a simple confirmation panel:

> **Your request has been received.**
> A representative will contact you to confirm your appointment. Please check your email for further information.

Plain text, no celebratory language, same layout container as the form.

---

## Privacy Policy & Terms Pages

Simple text pages using the shared `<Header />` and `<Footer />`. Placeholder copy only — no real legal content yet. Use `<PageTitle />` for the heading bar.

---

## Integration TODOs (in-code comments)

```
// TODO: Meta Pixel — add fbq('track', 'Lead') on successful form submission
// TODO: CRM sync — POST form payload to GoHighLevel or HubSpot webhook
// TODO: Confirmation email — trigger via CRM or transactional email provider
// TODO: Confirmation SMS — trigger via CRM or Twilio
// TODO: Calendar booking — replace Meeting Date/Time/Timezone fields with Calendly or GHL calendar embed
```

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<form>`, `<label>` with `htmlFor`
- All inputs have visible labels (no placeholder-only labels)
- Error messages rendered as `<p role="alert">` below each field
- Consent checkbox must be keyboard-accessible
- Sufficient color contrast throughout (navy on white, white on navy)
- Logical heading hierarchy: `h1` for page title, `h2` for form section

---

## `.gitignore` addition

Add `.superpowers/` to `.gitignore` to exclude brainstorming artifacts.
