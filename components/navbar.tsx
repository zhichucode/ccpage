"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  siteName?: string
}

export function Navbar({ siteName = "苏格" }: NavbarProps) {
  const navItems = [
    { name: "首页", href: "#hero" },
    { name: "项目", href: "#projects" },
    { name: "摄影", href: "#photos" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">{siteName}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.href.replace("#", ""))}
                className="text-sm"
              >
                {item.name}
              </Button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
