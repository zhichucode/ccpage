"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Mail, Linkedin } from "lucide-react"

interface HeroProps {
  name?: string
  bio?: string
  avatarUrl?: string
  socialLinks?: {
    github?: string
    twitter?: string
    email?: string
    linkedin?: string
  }
}

export function Hero({
  name = "苏格",
  bio = "软件开发者 | 开源爱好者 | 用代码构建未来",
  avatarUrl,
  socialLinks = {},
}: HeroProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <section className="flex flex-col items-center text-center space-y-6 py-12 px-4">
      <Avatar className="w-32 h-32 ring-4 ring-primary/20">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{bio}</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {socialLinks.github && (
          <Button variant="outline" size="icon" asChild>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
        )}
        {socialLinks.twitter && (
          <Button variant="outline" size="icon" asChild>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        )}
        {socialLinks.linkedin && (
          <Button variant="outline" size="icon" asChild>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        )}
        {socialLinks.email && (
          <Button variant="outline" size="icon" asChild>
            <a href={`mailto:${socialLinks.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
