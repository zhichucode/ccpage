import { NextResponse } from "next/server"
import { TwitterApi } from "twitter-api-v2"

export async function GET() {
  try {
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET
    const accessToken = process.env.TWITTER_ACCESS_TOKEN
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET
    const username = process.env.TWITTER_USERNAME

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret || !username) {
      console.error("Missing Twitter API credentials")
      return NextResponse.json(
        { error: "Twitter API credentials not configured" },
        { status: 500 }
      )
    }

    // 使用 TwitterApi 客户端进行 OAuth 1.0a 用户上下文认���
    const client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessTokenSecret,
    })

    console.log("Fetching user data for:", username)

    // 获取用户信息
    const user = await client.v2.userByUsername(username, {
      "user.fields": ["profile_image_url"],
    })

    console.log("User found:", user.data.id)

    // 获取用户的推文（最新3条，排除转发和回复）
    const timeline = await client.v2.userTimeline(user.data.id, {
      max_results: 3,
      "tweet.fields": ["created_at", "public_metrics"],
      exclude: ["retweets", "replies"],
    })

    console.log("Tweets fetched:", timeline.data.data?.length || 0)

    // 格式化返回数据
    const tweets = timeline.data.data?.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.created_at,
      url: `https://twitter.com/${username}/status/${tweet.id}`,
      metrics: tweet.public_metrics,
    })) || []

    return NextResponse.json({
      user: {
        username,
        profileImage: user.data.profile_image_url,
      },
      tweets,
    })
  } catch (error: any) {
    console.error("Error fetching tweets:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
        data: error.data,
      },
      { status: 500 }
    )
  }
}
