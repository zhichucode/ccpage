import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ToolsShowcase } from "@/components/tools-showcase"
import { PhotoGallery } from "@/components/photo-gallery"
import { Footer } from "@/components/footer"

export default function Home() {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero
          name="苏格"
          bio="软件开发者 | 开源爱好者 | 用代码构建未来"
          avatarUrl="/avatar.jpg"
          socialLinks={{
            github: githubUsername ? `https://github.com/${githubUsername}` : undefined,
          }}
        />
        <ToolsShowcase username={githubUsername} limit={6} />
        <PhotoGallery />
      </main>

      <Footer
        githubUrl={githubUsername ? `https://github.com/${githubUsername}` : "https://github.com"}
        owner="苏格"
      />
    </div>
  )
}
