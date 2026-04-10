# Filmmaker Template - Documentation

## 🎬 Introduction
This is a premium, high-fidelity HTML/Tailwind template designed for documentary filmmakers and cinematic artists. It features advanced GSAP animations, theme toggling, and built-in SEO optimization.

---

## 🏗️ Project Structure
```text
template-root/
├── assets/
│   ├── css/
│   │   ├── style.css       (Base layout & components)
│   │   ├── dark-mode.css    (Dark theme variables - Default)
│   │   ├── theme-light.css  (Light theme variables)
│   │   └── rtl.css          (Right-to-Left language support)
│   ├── js/
│   │   ├── main.js          (Core logic & animations)
│   │   ├── config.js        (User configuration toggle)
│   │   └── dashboard.js     (App-specific dash context)
│   └── images/              (Optimized assets)
├── pages/                   (Main HTML templates)
├── documentation/           (You are here)
└── README.md                (Main overview)
```

---

## ⚙️ Customization

### 1. Theming
The template uses CSS Variables. You can toggle colors in `dark-mode.css` and `theme-light.css`.
- **Default Theme**: Dark Mode is active by default via the `dark` class on the `<html>` element.
- **Toggle State**: Persists in `localStorage` under the key `theme`.

### 2. Animations (GSAP)
Most scroll-based animations are handled via standard reveal classes:
- `.reveal-up`: Slides element up on enter.
- `.count-up`: Logic for numeric stat counters.
- **ScrollTrigger**: Used for parallax and advanced timeline effects.

---

## 📈 SEO & Integrations

### Search Engine Optimization
- **Meta Tags**: Optimized `<title>` and `<meta name="description">` on every page.
- **Structured Data**: JSON-LD Person schema is included in `index.html`. Add your IMDb and social links in the `sameAs` array.
- **Robots/Sitemap**: `robots.txt` and `sitemap.xml` are pre-indexed locations.

### Integrations
- **Forms**: The contact form is pre-configured for **Netlify Forms** or **Formspree**. Simply update the `action` attribute.
- **Newsletter**: Styled for **Mailchimp** or **ConvertKit** embed compatibility.
- **Booking**: "Discovery Call" section in `services.html` is designed to house a **Calendly** widget or direct link.
- **Payment**: **Stripe/PayPal** buttons can be dropped into the "Secure Your Date" section.

---

## 📱 Responsiveness
- **Breakpoints**: 
  - Mobile: `< 640px`
  - Tablet: `640px to 1024px`
  - Desktop: `> 1024px`
- **RTL**: Use the RTL toggle in the navbar to preview Right-to-Left layouts.

---

## 🛠️ Credits & License
- **Framework**: Tailwind CSS
- **Animations**: GSAP (GreenSock)
- **Icons**: FontAwesome 6
- **License**: MIT License - Free for commercial and personal use.
