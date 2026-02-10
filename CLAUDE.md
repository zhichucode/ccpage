# Vibe Homepage

A modern personal homepage built with Next.js, featuring a blue theme and GitHub project showcase.

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme**: next-themes for dark mode support
- **Icons**: Lucide React

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main homepage
│   ├── layout.tsx            # Root layout with theme provider
│   └── globals.css           # Global styles
├── components/
│   ├── hero.tsx              # Avatar, bio, social links
│   ├── theme-toggle.tsx      # Dark mode toggle
│   ├── tools-showcase.tsx    # GitHub repos display
│   └── footer.tsx            # Footer component
├── lib/
│   └── github.ts             # GitHub API utilities
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind with blue theme
└── .env.local                # Environment variables (gitignored)
```

## Code Conventions

- Use TypeScript for all components
- Follow React functional component patterns with hooks
- Use Tailwind utility classes for styling
- Import shadcn/ui components from `@/components/ui`
- Use Lucide React for icons
- Async components use proper error boundaries
- GitHub API calls implement caching with revalidation

## Environment Variables

Create `.env.local` in the project root:

```env
# GitHub username for fetching public repositories
NEXT_PUBLIC_GITHUB_USERNAME=your_username_here

# Optional: Custom site metadata
NEXT_PUBLIC_SITE_NAME="Your Name"
NEXT_PUBLIC_SITE_DESCRIPTION="Your bio or description"
```

## Blue Color Palette

The theme uses a blue color palette configured in `tailwind.config.ts`:
- Primary: #3b82f6 (blue-500)
- Secondary: #1e40af (blue-800)
- Accent: #60a5fa (blue-400)

## Key Features

1. **Hero Section**: Displays avatar, name, bio, and social media links
2. **Theme Toggle**: Switch between light and dark modes
3. **Tools Showcase**: Fetches and displays GitHub repositories
4. **Responsive Design**: Mobile-first approach using Tailwind breakpoints
5. **Dark Mode**: Full dark mode support with system preference detection

## GitHub Integration

The homepage fetches public repositories from GitHub using:
- GitHub REST API (no authentication required for public repos)
- Next.js ISR (Incremental Static Regeneration) with 1-hour revalidation
- Error handling for API failures
- Loading skeletons for better UX

## Deployment

This site can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any platform supporting Node.js

For Vercel, set environment variables in the project settings.
