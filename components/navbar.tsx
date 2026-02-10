import { ThemeToggle } from "@/components/theme-toggle"

interface NavbarProps {
  siteName?: string
}

export function Navbar({ siteName = "zhichucode" }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">{siteName}</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
