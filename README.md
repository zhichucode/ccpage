# Vibe Homepage

A modern personal homepage built with Next.js 15+, featuring a blue theme and GitHub project showcase.

![Vibe Homepage](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-06B6D4?style=for-the-badge&logo=tailwind-css)

## Features

- 🎨 Modern blue-themed design with Tailwind CSS
- 🌓 Dark mode support with system preference detection
- 📱 Fully responsive (mobile-first approach)
- 🔗 GitHub integration to showcase public repositories
- ♿ Accessible components using shadcn/ui
- ⚡ Fast with Next.js App Router and ISR caching

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your GitHub username:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=your_username_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personalize Your Homepage

Edit `app/page.tsx` to update:
- Your name and bio
- Social media links
- Footer information

### Customize Colors

The blue theme is defined in `app/globals.css`. Modify the CSS variables in `:root` and `.dark` to change colors.

### Add More Components

Additional shadcn/ui components can be added:
```bash
npx shadcn@latest add [component-name]
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in your project settings
4. Deploy!

### Other Platforms

This can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Node.js

## Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Components:** [shadcn/ui](https://ui.shadcn.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & theme
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navigation bar
│   ├── theme-toggle.tsx  # Dark mode toggle
│   ├── tools-showcase.tsx # GitHub repos display
│   └── footer.tsx        # Footer
├── lib/                   # Utility functions
│   └── github.ts         # GitHub API utilities
└── CLAUDE.md             # Project documentation
```

## License

MIT

---

Built with ❤️ using Next.js and shadcn/ui
