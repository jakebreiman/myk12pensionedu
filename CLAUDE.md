# CLAUDE.md

## Project Overview
Build a **very simple, one-page appointment scheduling website** for **myfedpensionedu.com**.

The site should feel:
- plain
- formal
- trustworthy
- restrained
- institutional
- almost “government-like” in tone and appearance

This is **not** a flashy lead-gen site, modern SaaS landing page, or aggressive conversion funnel.

The goal is simple:

> Help a visitor understand the purpose of the page and schedule an appointment.

The entire page should feel neutral, informational, and easy to complete.

---

## Primary Goal
Create a single-page website where a consumer can submit their information and schedule an appointment.

The page should:
- build trust quickly
- explain the purpose in simple language
- present a straightforward booking form
- confirm submission with a plain thank-you state

---

## Non-Negotiable Design Direction
The design must be intentionally **vanilla**.

Think:
- government benefits page
- federal information portal
- public-sector educational resource
- formal institutional website

Do **not** make it feel like:
- a startup homepage
- a high-converting direct response funnel
- a trendy SaaS product
- a modern glossy insurance landing page

### Visual rules
Use:
- white background
- dark blue, navy, gray, black, muted tones
- simple typography
- generous spacing
- thin borders
- subtle section separation
- minimal shadows, if any
- conservative button styling
- extremely light border radius only if needed

Avoid:
- gradients
- bright accent colors
- glossy cards
- oversized CTA buttons
- illustrations
- animations
- parallax
- testimonials with stock-photo energy
- modern “tech” UI patterns
- loud marketing elements

The result should feel intentionally plain and credible.

---

## Brand / Tone
The tone should be:
- neutral
- compliant
- informative
- direct
- calm
- trustworthy

Do not use hype language.

### Avoid phrases like:
- unlock your benefits
- maximize your retirement
- exclusive opportunity
- act now
- limited spots
- don’t miss out
- discover how much more you could get

### Prefer language like:
- request an appointment
- review available options
- speak with a representative
- receive educational information
- schedule a time to talk
- submit your information below

---

## Technical Stack
Use:
- **Next.js**
- **Tailwind CSS**
- **React Hook Form**
- **Zod**

Code should be:
- clean
- readable
- modular
- easy to maintain
- easy to extend later

---

## Page Requirements
This is a **single-page website**.

### Required sections
1. **Minimal Header**
   - text-based or very simple logo treatment for `myfedpensionedu.com`
   - small contact link
   - no oversized navigation
   - no unnecessary menu items

2. **Hero / Intro**
   - one simple headline
   - short supporting paragraph
   - 2–4 plain bullet points
   - one CTA button that scrolls to the form

3. **Informational / Trust Section**
   - explain who the appointment is for
   - explain that the page is informational / educational in tone
   - include brief disclaimer-style language if appropriate
   - keep this section plain and readable

4. **Appointment Form Section**
   - this is the main purpose of the page
   - should be prominent but still visually simple
   - may be single-step or lightly multi-step
   - if multi-step, keep it extremely simple and practical
   - labels must be clear and accessible

5. **Thank-You State**
   - after form submission, show a very simple confirmation state
   - tone should be reassuring and plain
   - no celebratory marketing language

6. **Footer**
   - privacy policy
   - terms
   - contact info
   - simple layout only

---

## Form Fields
Include the following fields:

- Full Name
- Work Email
- Personal Email
- Mobile Number
- Agency / Employer
- Department / Office
- Job Title
- State
- Appointment Type
- Meeting Date
- Meeting Time
- Timezone
- Optional Notes
- Consent Checkbox

### Form behavior
- Use **React Hook Form + Zod**
- Show clear inline validation
- Use simple error messaging
- Keep field labels visible
- Keep spacing clean and readable
- Use a **mock submit action**
- Support hidden UTM fields for tracking
- Make future integrations easy

---

## Future Integration Readiness
Code should be structured so this can later connect to:
- GoHighLevel
- HubSpot
- webhooks
- calendar/scheduling systems
- email/SMS confirmations

Add clear `TODO` comments for:
- Meta Pixel
- CRM sync
- confirmation email
- confirmation SMS
- calendar booking integration

---

## UX Principles
Prioritize:
- clarity
- trust
- readability
- simplicity
- accessibility
- low friction

The user should understand the page within a few seconds.

Every element should serve the purpose of:
1. informing the visitor
2. helping them submit the form

If something is decorative but unnecessary, remove it.

---

## Accessibility Expectations
- clear heading hierarchy
- visible labels
- keyboard-friendly inputs
- sufficient contrast
- readable font sizes
- obvious error states
- buttons and links that are easy to identify

---

## Layout Guidance
Keep the layout narrow and easy to scan.

Suggested structure:
- centered content container
- restrained max-width
- modest vertical spacing
- form in a bordered box or simple panel
- sections separated with whitespace or light borders

Do not over-design.

---

## Copy Guidance
Copy should sound like an informational appointment request page, not an ad.

### Good examples of tone
- Request an Appointment
- Schedule a Time to Speak
- Submit Your Information Below
- Educational Information for Federal Employees
- A representative may contact you regarding your request

### Bad examples of tone
- Unlock Your Federal Retirement Potential
- Get the Benefits You Deserve
- Don’t Leave Money on the Table
- Claim Your Free Review Today

---

## Originality Constraint
Do **not** copy `mypensionassistance.com` directly.

You may take inspiration from the general funnel logic:
- trust-building intro
- simple informational content
- appointment form
- confirmation state

But the implementation must be original in:
- layout
- styling
- wording
- component structure
- visual presentation

---

## Output Expectations
When implementing:
- keep files organized
- use reusable components where sensible
- do not over-engineer
- prefer simple solutions
- keep styling restrained
- keep content plain and credible

If there is a decision between:
- “more modern and impressive”
- “more simple and institutional”

Choose:
> **more simple and institutional**

---

## Final Standard
The finished page should look like something a cautious, trust-sensitive user would feel comfortable submitting a form on.

It should feel:
- safe
- plain
- credible
- official
- easy to understand

Not flashy. Not trendy. Not clever.

Just clear, structured, and trustworthy.