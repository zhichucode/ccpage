"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

interface Tweet {
  id: string
  text: string
  createdAt: string
  url: string
  metrics: {
    like_count: number
    retweet_count: number
    reply_count: number
  }
}

interface TweetsData {
  user: {
    username: string
    profileImage: string
  }
  tweets: Tweet[]
}

export function TweetsShowcase() {
  const [data, setData] = useState<TweetsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTweets() {
      try {
        const response = await fetch("/api/tweets", {
          next: { revalidate: 300 }, // Cache for 5 minutes
        })

        if (!response.ok) {
          throw new Error("Failed to fetch tweets")
        }

        const tweetsData = await response.json()
        setData(tweetsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchTweets()
  }, [])

  if (loading) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">最新推文</h2>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  if (error || !data || data.tweets.length === 0) {
    return null // Don't show section if there's an error or no tweets
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">最新推文</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {data.tweets.map((tweet) => (
          <Card
            key={tweet.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.open(tweet.url, "_blank")}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">@{data.user.username}</span>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(tweet.createdAt), {
                        addSuffix: true,
                        locale: zhCN,
                      })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {tweet.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>❤️ {tweet.metrics.like_count}</span>
                    <span>🔄 {tweet.metrics.retweet_count}</span>
                    <span>💬 {tweet.metrics.reply_count}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
