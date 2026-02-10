import { NextResponse } from "next/server"

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

    // 使用 Twitter API v2 获取用户推文
    // 首先获取用户 ID
    console.log("Fetching user data for:", username)
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    )

    const userResponseText = await userResponse.text()
    console.log("User API response status:", userResponse.status)
    console.log("User API response:", userResponseText)

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user data", details: userResponseText },
        { status: userResponse.status }
      )
    }

    const userData = JSON.parse(userResponseText)
    const userId = userData.data.id

    // 获取用户的时间线（最新3条推文）
    console.log("Fetching tweets for user ID:", userId)
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=3&tweet.fields=created_at,public_metrics&exclude=retweets,replies`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    )

    const tweetsResponseText = await tweetsResponse.text()
    console.log("Tweets API response status:", tweetsResponse.status)
    console.log("Tweets API response:", tweetsResponseText)

    if (!tweetsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tweets", details: tweetsResponseText },
        { status: tweetsResponse.status }
      )
    }

    const tweetsData = JSON.parse(tweetsResponseText)

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
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
