import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET
    const username = process.env.TWITTER_USERNAME

    if (!apiKey || !apiSecret || !username) {
      console.error("Missing Twitter API credentials")
      return NextResponse.json(
        { error: "Twitter API credentials not configured" },
        { status: 500 }
      )
    }

    // 生成 Bearer Token (Base64 encoded API key:secret)
    const bearerToken = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

    // 首先获取 Bearer Token
    const tokenResponse = await fetch('https://api.twitter.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Failed to get bearer token:", errorText)
      return NextResponse.json(
        { error: "Failed to authenticate with Twitter", details: errorText },
        { status: 401 }
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    console.log("Fetching user data for:", username)

    // 获取用户信息
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    )

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error("Failed to fetch user:", errorText)
      return NextResponse.json(
        { error: "Failed to fetch user data", details: errorText },
        { status: userResponse.status }
      )
    }

    const userData = await userResponse.json()
    const userId = userData.data.id

    console.log("User found:", userId)

    // 获取用户的推文（最新3条）
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=3&tweet.fields=created_at,public_metrics&exclude=retweets,replies`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    )

    if (!tweetsResponse.ok) {
      const errorText = await tweetsResponse.text()
      console.error("Failed to fetch tweets:", errorText)
      return NextResponse.json(
        { error: "Failed to fetch tweets", details: errorText },
        { status: tweetsResponse.status }
      )
    }

    const tweetsData = await tweetsResponse.json()

    console.log("Tweets fetched:", tweetsData.data?.length || 0)

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
  } catch (error: any) {
    console.error("Error fetching tweets:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
