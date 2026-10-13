# Green Torque (GT EMEA) - Enterprise Website Redesign

A modern, responsive, corporate multi-page web application redesign for **Green Torque (GT EMEA)**, a premier Middle East IT systems integrator.

Live reference site: [https://www.gt-emea.com/](https://www.gt-emea.com/)

---

## 🌟 Key Highlights & Architectural Features

1. **Authentic Corporate Identity & Colors**
   - Preserved Green Torque's signature green identity (`#6ab04c`) harmonized with high-end dark slate (`#060b17`, `#0b1325`, `#111d38`) and glassmorphic elevated surfaces.
   - Genuine high-resolution logos, brand artwork, authentic regional office imagery (Sharjah, Dubai, Kuwait), and certified partner logos.

2. **Traditional Multi-Page HTML Architecture**
   - Clean, separate, and independently loadable HTML pages:
     - `index.html` – Engaging homepage with hero, 4 core solution pillars, verified statistics counters, methodology, partners, locations, and CTA.
     - `about.html` – Detailed company background, Mission & Vision, core values, our team capabilities, and service commitments.
     - `services.html` – Comprehensive portfolio of all **33 verified GT services** with live search and category filtering.
     - `partners.html` – Strategic tier-1 technology partners (Microsoft, Cisco, VMware, Dell, Veeam, Fortinet, etc.) with category tabs, search, and partnership value proposition.
     - `contact.html` – Verified Middle East offices (Sharjah FZC, Dubai LLC, Kuwait), interactive enquiry form with frontend validation, feedback modal, and direct links.

3. **Complete Bi-Lingual English & Arabic Localization (LTR & RTL)**
   - Persistent language switcher in the shared navigation header with flag indicators.
   - **Full Arabic support**:
     - Automatically switches `lang="ar"` and `dir="rtl"`.
     - Switches font rendering to `Cairo` for authentic Arabic typography.
     - Automatically mirrors layouts, arrows, badges, and controls.
     - Preserves LTR format for technical identifiers, telephone numbers, and email addresses.
     - Selection persists across page refreshes and multi-page navigation using `localStorage`.

4. **Interactive Features & Performance**
   - Smooth numeric counter animations on viewport entry.
   - Real-time client-side search and category filtering on Services and Partners pages.
   - Interactive contact form with comprehensive frontend validation (email format, telephone digits, min length) and submission feedback modal.
   - Floating quick-contact buttons (WhatsApp chat, Email) and smooth Scroll-to-Top button.
   - Accessibility compliant: handles `prefers-reduced-motion` cleanly.

---

## 📂 Project Structure

```
Green Torque/
├── index.html                   # Home Page
├── about.html                   # About Us Page
├── services.html                # Services Page (33 Verified Services)
├── partners.html                # Partners Page (28+ Certified Partners)
├── contact.html                 # Contact Page (UAE & Kuwait Offices + Form)
├── assets/
│   ├── css/
│   │   ├── style.css            # Master Design System, Color Tokens, Components
│   │   ├── responsive.css       # Mobile drawer, Tablet & Phone Breakpoints
│   │   └── rtl.css              # Arabic Right-to-Left Layout Overrides
│   ├── js/
│   │   ├── translations.js      # Complete Bi-lingual English/Arabic Dictionary
│   │   ├── language.js          # Language Switcher & LocalStorage Persistence
│   │   └── main.js              # Sticky Nav, Counters, Live Filters, Form Validation
│   └── images/
│       ├── logo-white.png       # Authentic GT White Logo
│       ├── logo-dark.png        # Authentic GT Dark Logo
│       ├── favicon.png          # Authentic GT Favicon (128x128)
│       ├── hero-graphic.png     # Brand Technology Visual
│       ├── about-img.png        # About Section Infrastructure Visual
│       ├── sharjah.jpg          # Sharjah Office (Al Noor Island)
│       ├── dubai.jpg            # Dubai Office (Burj Khalifa Oud Metha)
│       ├── kuwait.jpg           # Kuwait Office (Al-Dajeej)
│       ├── process-1.png        # Analyse Process Icon
│       ├── process-2.png        # Design Process Icon
│       ├── process-3.png        # Deploy Process Icon
│       └── partners/            # 24+ Authentic Tier-1 Vendor Logos
└── README.md
```

---

## 🏢 Verified Company Information

### Regional Headquarters & Offices
- **UAE - Sharjah**: Green Torque International FZC, Q1-05, Sharjah Free Zone, PO Box: 8681, Sharjah - UAE | Tel: `+971 65533454` | Email: `info@gt-emea.com`
- **UAE - Dubai**: Green Torque Technologies LLC, Office Court Building, Floor 3, Suite 314, Oud Metha, Dubai - UAE | Tel: `+971 48343844` | Email: `infodxb@gt-emea.com`
- **Kuwait**: Green Torque Kuwait, Al-Dajeej, Farwaniya, PO Box: 20988, Safat, 13070, Kuwait | Tel: `+965 24312384` | Email: `info@gt-kw.com`

### Verified Statistics
- **15,000+** Active Users on Service Platform
- **5,000+** Enterprise Clientele
- **3,000+** Successful Completed Projects
- **499+** Specialized Support Services

### Client Support Portal
- Live 24/7 SLA Portal: [https://greencloud.live](https://greencloud.live)

---

## 🚀 How to Run Locally

Since this is a clean multi-page HTML5/CSS3/Vanilla JS project, it requires zero compile steps or heavy dependencies:

1. **Option A: Direct Browser Preview**
   - Double click `index.html` to open directly in any browser.

2. **Option B: Local Web Server (Recommended)**
   - Using Node: `npx serve .` or `npx http-server .`
   - Using Python: `python -m http.server 8000`
   - Using VS Code: Right-click `index.html` -> "Open with Live Server"

---

## 🌐 Testing Verification Checklist

- [x] All 5 HTML pages open independently with clean relative navigation.
- [x] Shared navigation header and footer consistent across all pages.
- [x] Original brand colors (`#6ab04c`) and logo preserved.
- [x] English / Arabic language switcher translates all visible text without hardcoded gaps.
- [x] Arabic RTL layout correctly mirrors margins, paddings, and icons.
- [x] Phone numbers and email addresses remain correctly formatted in LTR under Arabic mode.
- [x] Language preference persists in `localStorage` across page hops.
- [x] Real-time search and category filtering works on both Services and Partners pages.
- [x] Frontend form validation enforces required fields and valid email/phone formats.
