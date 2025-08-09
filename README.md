# Zay — Modern E‑commerce Template (HTML/CSS/JS)

A modern, responsive, and accessible single‑page e‑commerce template built with plain HTML, CSS, and vanilla JavaScript. No build step. Just open `index.html`.

## ✨ Highlights
- **Clean, modern UI** with polished micro‑interactions
- **Fully responsive**: desktop, tablet, and mobile
- **Sticky header** with refined action icons (Search, Cart, User)
- **Smooth animations** and scroll‑in reveals
- **Zero dependencies needed to run**

## 🧩 Tech Stack
- HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- Font Awesome icons, Google Fonts (Poppins)

## 🚀 Getting Started
1. Download or clone this folder
2. Open `index.html` in your browser
3. Optional local server for better testing:
   - Python: `python -m http.server 5500`
   - Node (http-server): `npx http-server -p 5500 --silent`
   Then open `http://localhost:5500/`

## 📁 Project Structure
```
zay-website/
├── index.html          # Markup & page sections
├── styles.css          # All styles & animations
├── script.js           # Interactions and UI logic
└── README.md
```

## ⚙️ Interactive Features
- **Hero carousel** with seamless transitions and optional auto‑rotation
- **Mobile navigation** with a collapsible menu button
- **Search modal** with popular suggestions
- **Product cards** with hover overlay and quick actions
- **Newsletter subscription** with email validation and toasts
- **Smooth scrolling** for in‑page navigation

## 🛒 Shopping Cart (Client‑side)
- Add products, change quantities, and remove items
- Cart persists in `localStorage`
- Live total price and item count badge
- Cart sidebar opens automatically after adding a product

## 🔐 Auth (UI only)
- Simple Login/Register modal with basic validation (demo only)

## ✅ Recent Enhancements (Safe & Non‑Breaking)
- Replaced placeholder images with local assets and corrected image paths (forward slashes)
- Smoother carousel updates (no “refresh” flicker) with configurable autoplay
- Hero image scaled down by ~30% (`max-width: 70%`) for better visual balance
- Refined header actions: circular buttons, subtle hover/press effects
- Notification badges moved outside buttons (cleaner) and auto‑hidden when zero
- Cart opens on “Add to Cart”; count badge updates correctly
- Added `aria-label` for key buttons to improve accessibility
- Enabled lazy‑loading for non‑hero images via `enableLazyImages()`
- Added a concise meta description for basic SEO

## 🧪 Useful Tweaks
### Carousel configuration (`script.js` > `initCarousel()`)
```js
// Toggle autoplay and adjust pace (ms)
const AUTOPLAY = true;
const INTERVAL = 8000;
```

### Slides content (`script.js` > `updateHeroContent()`)
```js
const slides = [
  { title: 'Proident occaecat', subtitle: 'Aliquip ex ea commodo consequat', image: 'images/Curology Product.jpg' },
  { title: 'Premium Quality',   subtitle: 'Best Products for You',            image: 'images/Curology Product.jpg' },
  { title: 'Special Offers',    subtitle: 'Limited Time Deals',               image: 'images/Curology Product.jpg' }
];
```

### Accessibility
- `aria-label` on header action buttons
- Visible focus states on interactive controls

### Performance
- Non‑hero images are lazy‑loaded (and decoded async) for faster initial render
- Consider exporting images as WebP/AVIF for further gains

## 🎨 Design Notes
- Primary color: `#20c997`
- Dark (header/footer): `#2c3e50`
- Light backgrounds: `#f8f9fa`
- Typeface: Poppins (300/400/500/600/700)

## 🌐 Browser Support
Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## 📄 License
MIT — see `LICENSE` (or include your preferred license)

## 🤝 Contributing
PRs are welcome.

---
Built with ❤️ to showcase a clean, modern e‑commerce experience. 