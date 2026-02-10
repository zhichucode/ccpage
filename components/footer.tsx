import { Github } from "lucide-react"

interface FooterProps {
  githubUrl?: string
  owner?: string
}

export function Footer({ githubUrl = "https://github.com", owner = "Your Name" }: FooterProps) {
  return (
    <footer className="border-t py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {owner}. All rights reserved.
        </p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>View source</span>
        </a>
      </div>
    </footer>
  )
}
