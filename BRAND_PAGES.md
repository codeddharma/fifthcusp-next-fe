# Brand Pages — (brand) Route Group

All public-facing pages under `src/app/(brand)/`. Base API: `https://astro-5dcy.onrender.com/api`

---

| # | Route | File | APIs Used |
|---|---|---|---|
| 1 | `/` | `page.tsx` | `GET /about` · `GET /faqs/list?page=Home` · `GET /faqs/list?page=About us` |
| 2 | `/about-us` | `about-us/page.tsx` | `GET /about` · `GET /faqs/list?page=About us` |
| 3 | `/contact` | `contact/page.tsx` | `POST /contact` |
| 4 | `/careers` | `careers/page.tsx` | `GET /careers` · `GET /faqs/list?page=Careers` |
| 5 | `/blogs` | `blogs/page.tsx` | `GET /blogs` |
| 6 | `/blog/[id]` | `blog/[id]/page.tsx` | `GET /blogs/:id` |
| 7 | `/book` | `book/page.tsx` | — (static form, no API) |
| 8 | `/know-more` | `know-more/page.tsx` | `GET /know-more` |
| 9 | `/experiences` | `experiences/page.tsx` | `GET /experience` |
| 10 | `/free-calculator` | `free-calculator/page.tsx` | `GET /faqs/list?page=Free Calculators` · `POST /kundli/calculate` · `POST /numerology/calculate` · `POST /compatibility/calculate` · `POST /gemstone/calculate` · `POST /dasha/calculate` · `POST /manglik/calculate` · `POST /nakshatra/calculate` · `POST /planetary/calculate` · `POST /transit/calculate` · `POST /zodiac/calculate` · `POST /daily-prediction/fetch` · `POST /horoscope/calculate` |
| 11 | `/astrology` | `astrology/page.tsx` | `GET /astrology-services/all` · `GET /faqs/list?page=Astrology` · `POST /bookings/create` · Razorpay |
| 12 | `/energy` | `energy/page.tsx` | `GET /energy-services/all` · `GET /faqs/list?page=Energy` · `POST /bookings/create` · Razorpay |
| 13 | `/vastu` | `vastu/page.tsx` | `GET /vastu-services/all` · `GET /faqs/list?page=Vastu` · `POST /bookings/create` · Razorpay |
| 14 | `/manifestation` | `manifestation/page.tsx` | `GET /manifestation-services/all` · `GET /faqs/list?page=Manifestation` · `POST /bookings/create` · Razorpay |
| 15 | `/material` | `material/page.tsx` | `GET /material-services/all` · `GET /faqs/list?page=Material` · `POST /bookings/create` · Razorpay |
| 16 | `/tarot-reading` | `tarot-reading/page.tsx` | `GET /tarot-services/all` · `GET /faqs/list?page=Tarot` · `POST /bookings/create` · Razorpay |
| 17 | `/wealth-architecture` | `wealth-architecture/page.tsx` | `GET /wealth-services/all` · `GET /faqs/list?page=WealthArchitecture` · `POST /bookings/create` · Razorpay |
| 18 | `/numerology` | `numerology/page.tsx` | `GET /numerology-services/all` · `GET /faqs/list?page=Numerology` · `POST /bookings/create` · Razorpay |
| 19 | `/service/[id]` | `service/[id]/page.tsx` | `GET /astrology-services/:id` · `GET /energy-services/:id` · `GET /services/:id` (tries in order) |

---

## Pending Pages (not yet ported)

| Route | CRA Source |
|---|---|
| `/pay` | `PaymentPage.jsx` |
| `/kundli-report` | `services/reports/KundliReport.jsx` |
| `/numerology-report` | `services/reports/NumerologyReport.jsx` |
| `/compatibility-report` | `services/reports/CompatibilityReport.jsx` |
| `/manifestation-calendar` | `services/reports/ManifestationCalendar.jsx` |

---

## Shared API Patterns

- **Services (rows 11–18)** all use the shared `ServicePage` component (`src/components/ServicePage.tsx`)
- **Booking flow** (3-step): `GET /{service}-services/all` → form → `POST /payments/create-order` + `POST /payments/verify` → `POST /bookings/create`
- **FAQs** are page-scoped: `GET /faqs/list?page={PageName}`
