## 🚀 Getting started

### Prerequisites
- Node.js ≥ 18
- npm or pnpm

### Install & run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server starts at `http://localhost:5173`.

## 🎨 Customisation

**All content** is in `src/data/portfolio.ts` — names, bio, skills, projects, experience, and social links. Change that file and you're done.

**Colours** are set in `tailwind.config.js` and `src/index.css`. The brand gradient (`--gradient-brand`) uses `violet → blue → cyan`; swap those hex values to retheme in seconds.

**Profile image** — in `About.tsx`, replace the emoji placeholder with a real `<img>` tag pointing to your photo.

**Contact form** — the form currently simulates a send. Wire `handleSubmit` in `Contact.tsx` to [Formspree](https://formspree.io), [EmailJS](https://emailjs.com), or your own API endpoint.

## 🛠️ Tech stack

| Tool | Version |
|------|---------|
| React | 18 |
| TypeScript | 5 |
| Vite | 5 |
| Tailwind CSS | 3 |
| Framer Motion | 11 |
| Lucide React | latest |

## 📄 License

MIT — use it, fork it, ship it.
