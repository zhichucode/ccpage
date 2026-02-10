"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, ExternalLink, Loader2 } from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  homepage: string | null
  topics: string[]
}

interface ToolsShowcaseProps {
  username?: string
  limit?: number
}

export function ToolsShowcase({ username, limit = 6 }: ToolsShowcaseProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      if (!username) {
        setError("GitHub username not configured")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}&type=public`,
          {
            next: { revalidate: 3600 }, // Cache for 1 hour
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch repositories")
        }

        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username, limit])

  if (loading) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">我的项目</h2>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">我的项目</h2>
        <div className="text-center text-muted-foreground">
          <p>无法加载项目，请稍后再试。</p>
        </div>
      </section>
    )
  }

  if (repos.length === 0) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">我的项目</h2>
        <div className="text-center text-muted-foreground">
          <p>暂无项目。</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">我的项目</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {repos.map((repo) => (
          <Card
            key={repo.id}
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl line-clamp-1">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {repo.name}
                  </a>
                </CardTitle>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="查看在线演示"
                    className="shrink-0"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </a>
                )}
              </div>
              <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                {repo.description || "暂无描述"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics?.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {repo.language && (
                  <Badge variant="outline" className="text-xs">
                    {repo.language}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
