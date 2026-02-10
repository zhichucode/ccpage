import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ToolsShowcase } from "@/components/tools-showcase"
import { Footer } from "@/components/footer"

export default function Home() {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero
          name="zhichucode"
          bio="Software Developer | Open Source Enthusiast | Building the future one commit at a time"
          socialLinks={{
            github: githubUsername ? `https://github.com/${githubUsername}` : undefined,
            email: "hello@zhichucode.com",
          }}
        />
        <ToolsShowcase username={githubUsername} limit={6} />
      </main>

      <Footer
        githubUrl={githubUsername ? `https://github.com/${githubUsername}` : "https://github.com"}
        owner="zhichucode"
      />
    </div>
  )
}
