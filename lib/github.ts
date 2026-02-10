export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  updated_at: string
  created_at: string
}

export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  blog: string | null
  location: string | null
  public_repos: number
  followers: number
  following: number
}

const GITHUB_API_BASE = "https://api.github.com"

/**
 * Fetches public repositories for a given GitHub username
 * @param username - GitHub username
 * @param limit - Maximum number of repositories to fetch (default: 6)
 * @param type - Type of repositories to fetch (default: "public")
 * @returns Promise<GitHubRepo[]>
 */
export async function fetchUserRepos(
  username: string,
  limit = 6,
  type: "all" | "owner" | "member" | "public" = "public"
): Promise<GitHubRepo[]> {
  if (!username) {
    throw new Error("GitHub username is required")
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${limit}&type=${type}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour using Next.js ISR
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetches user profile information from GitHub
 * @param username - GitHub username
 * @returns Promise<GitHubUser>
 */
export async function fetchUserProfile(username: string): Promise<GitHubUser> {
  if (!username) {
    throw new Error("GitHub username is required")
  }

  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetches both user profile and repositories
 * @param username - GitHub username
 * @param repoLimit - Maximum number of repositories to fetch
 * @returns Promise<{ user: GitHubUser; repos: GitHubRepo[] }>
 */
export async function fetchGitHubData(
  username: string,
  repoLimit = 6
): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
  const [user, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepos(username, repoLimit),
  ])

  return { user, repos }
}
