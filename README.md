# 🌟 Nexium Quotes — Motivational Quote Generator

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p align="center">
  <strong>An intelligent, interactive, and beautifully designed quote discovery application delivering dynamic inspiration on demand.</strong>
</p>

[✨ Live Demo](#-live-demo--deployment) • [🚀 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📂 Project Structure](#-project-structure) • [💻 Getting Started](#-getting-started) • [📖 Note on Commits](#-note-on-commit-history)

</div>

---

> [!NOTE]
> ### 📌 Note on Commit History
> From Day 0 to Day 6, development proceeded continuously on the Quote Generator project. Due to breaking configuration issues and workspace migration, the GitHub repository was cleanly initialized on Day 7. The current codebase consolidates all architectural and visual improvements, with consistent commits tracked moving forward.

---

## 🎯 Overview

**Nexium Quotes** is a modern, responsive web application engineered to inspire minds and boost daily productivity. It blends live quote aggregation with a rich offline curated library across 10 distinct categories, wrapped in an ultra-modern glassmorphic user interface with fluid micro-interactions and dark mode support.

---

## 🚀 Features

- **🌐 Dynamic Live API Integration**: Fetches real-time quotes via the DummyJSON Quotes API with smart filtering by author and topic keywords.
- **📚 Curated Multi-Category Library**: Comprehensive offline fallback with 150+ handpicked motivational quotes spanning 10 topics:
  - 🏆 *Success*, ⚡ *Motivation*, 🎯 *Focus*, 🛡️ *Resilience*, 🧠 *Mindset*, 💡 *Creativity*, 👑 *Leadership*, 💖 *Self-Love*, 🔨 *Hard Work*, and ⏳ *Discipline*.
- **🎨 Dynamic Glassmorphism UI**: Ambient randomized background gradients, frosted glass cards, and modern typography powered by Google Fonts (`Poppins`).
- **🌓 Seamless Theme Switching**: Full dark / light mode support powered by `next-themes` with custom theme variables.
- **🏷️ Interactive Category Pills**: Instant 1-click topic selection and exploration.
- **🔍 Smart Search & Randomizer**: Full-text query bar with real-time feedback and instant random generation.
- **📋 1-Click Clipboard Copy**: Easy copy with visual checkmark state transitions and `sonner` toast notifications.
- **⚡ Skeleton Loaders & Micro-Interactions**: Smooth entrance and stagger animations with `framer-motion`, accompanied by shimmering skeleton cards during network fetches.
- **🛡️ Resilient Network Architecture**: Includes 6-second timeout abort controllers with automatic fallback to curated datasets.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router, Server/Client components, optimized builds |
| **UI Library** | [React 19](https://react.dev/) | Core UI rendering engine |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) | Modern utility-first styling system |
| **Typography** | [Google Fonts (`Poppins`)](https://fonts.google.com/specimen/Poppins) | Polished, modern sans-serif typography |
| **Component Kit** | [ShadCN UI](https://ui.shadcn.dev/) + [Radix UI](https://www.radix-ui.com/) | Accessible, composable primitive components |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth UI transitions, scale feedback, card reveals |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean and modern icon set |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Sleek toast alert system |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety |
| **Deployment** | [Vercel](https://vercel.com/) | Continuous integration and edge delivery |

---

## 📂 Project Structure

```text
Nexium_Jamal_Assign1/
├── app/
│   ├── favicon.ico          # Application favicon
│   ├── globals.css          # Tailwind CSS v4 design tokens & theme variables
│   ├── layout.tsx           # Root layout with ThemeProvider & Sonner Toaster
│   └── page.tsx             # Home view rendering QuoteForm
├── components/
│   ├── ui/                  # Reusable ShadCN / Radix primitive components
│   │   ├── button.tsx       # Accessible button with CVA variants
│   │   └── input.tsx        # Styled input field component
│   ├── LoginForm.tsx        # Modular auth / login component template
│   ├── QuoteForm.tsx        # Core interactive quote generator engine
│   └── theme-provider.tsx   # NextThemes provider wrapper
├── lib/
│   └── utils.ts             # Tailwind class merge helper (clsx + twMerge)
├── public/                  # Static assets
├── components.json          # ShadCN configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and npm scripts
├── postcss.config.mjs       # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.18.0` or later recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/beginnercodee/Nexium_Jamal_Assign1.git
   cd Nexium_Jamal_Assign1
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `localhost:3000` |
| `npm run build` | Builds the optimized production bundle |
| `npm run start` | Runs the built production server locally |
| `npm run lint` | Runs ESLint checks across the codebase |

---

## 🌐 Live Demo & Deployment

The application is configured for continuous deployment on **Vercel**:
- Every push to the `main` branch automatically triggers a production build and deployment.
- **GitHub Repository**: [beginnercodee/Nexium_Jamal_Assign1](https://github.com/beginnercodee/Nexium_Jamal_Assign1)

---

## 👨‍💻 Author

**Jamal Nadeem**
- GitHub: [@beginnercodee](https://github.com/beginnercodee)
- Assignment: **Nexium Project Assignment 1**

---

## 📄 License

This project is created for educational and assignment purposes under the [MIT License](LICENSE).
