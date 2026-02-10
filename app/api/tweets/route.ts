import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET
    const accessToken = process.env.TWITTER_ACCESS_TOKEN
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET
    const username = process.env.TWITTER_USERNAME

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret || !username) {
      return NextResponse.json(
        { error: "Twitter API credentials not configured" },
        { status: 500 }
      )
    }

    // 使用 Twitter API v2 获取用户推文
    // 首先获取用户 ID
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    )

    if (!userResponse.ok) {
      console.error("Twitter API error:", await userResponse.text())
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: userResponse.status }
      )
    }

    const userData = await userResponse.json()
    const userId = userData.data.id

    // 获取用户的时间线（最新3条推文）
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=3&tweet.fields=created_at,public_metrics&exclude=retweets,replies`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    )

    if (!tweetsResponse.ok) {
      console.error("Twitter API error:", await tweetsResponse.text())
      return NextResponse.json(
        { error: "Failed to fetch tweets" },
        { status: tweetsResponse.status }
      )
    }

    const tweetsData = await tweetsResponse.json()

    // 格式化返回数据
    const tweets = tweetsData.data?.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.created_at,
      url: `https://twitter.com/${username}/status/${tweet.id}`,
      metrics: tweet.public_metrics,
    })) || []

    return NextResponse.json({
      user: {
        username,
        profileImage: userData.data.profile_image_url,
      },
      tweets,
    })
  } catch (error) {
    console.error("Error fetching tweets:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
