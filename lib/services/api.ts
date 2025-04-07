import type { ApiResponse, Game, Screenshot, GameQueryParams } from "@/lib/types"

// You would need to get an API key from RAWG
const API_KEY = "your-rawg-api-key"
const BASE_URL = "https://api.rawg.io/api"

export async function fetchGames(params: GameQueryParams): Promise<ApiResponse<Game>> {
  // In a real app, you would use the actual API
  // This is a mock implementation for demonstration

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  const mockGames: Game[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Game ${i + 1}`,
    slug: `game-${i + 1}`,
    background_image: `/placeholder.svg?height=200&width=400&text=Game ${i + 1}`,
    released: new Date(2020, 0, 1).toISOString(),
    rating: 4.5 - (i % 5) * 0.5,
    genres: [
      { id: 1, name: "Action", slug: "action" },
      { id: 2, name: "Adventure", slug: "adventure" },
    ],
    tags: [
      { id: 1, name: "Singleplayer", slug: "singleplayer" },
      { id: 2, name: "Multiplayer", slug: "multiplayer" },
    ],
  }))

  return {
    count: 100,
    next: params.page < 5 ? `page=${params.page + 1}` : null,
    previous: params.page > 1 ? `page=${params.page - 1}` : null,
    results: mockGames,
  }
}

export async function fetchGameDetails(id: string): Promise<Game> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock data
  return {
    id: Number.parseInt(id),
    name: `Game ${id}`,
    slug: `game-${id}`,
    background_image: `/placeholder.svg?height=400&width=800&text=Game ${id}`,
    released: new Date(2020, 0, 1).toISOString(),
    rating: 4.5,
    description: `<p>This is a detailed description for Game ${id}. It includes information about gameplay, story, and features.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>`,
    genres: [
      { id: 1, name: "Action", slug: "action" },
      { id: 2, name: "Adventure", slug: "adventure" },
      { id: 3, name: "RPG", slug: "rpg" },
    ],
    platforms: [
      { platform: { id: 1, name: "PC", slug: "pc" } },
      { platform: { id: 2, name: "PlayStation 5", slug: "playstation5" } },
      { platform: { id: 3, name: "Xbox Series X", slug: "xbox-series-x" } },
    ],
    tags: [
      { id: 1, name: "Singleplayer", slug: "singleplayer" },
      { id: 2, name: "Multiplayer", slug: "multiplayer" },
      { id: 3, name: "Open World", slug: "open-world" },
      { id: 4, name: "First Person", slug: "first-person" },
    ],
  }
}

export async function fetchGameScreenshots(id: string): Promise<ApiResponse<Screenshot>> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Mock data
  const mockScreenshots: Screenshot[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    image: `/placeholder.svg?height=600&width=1200&text=Screenshot ${i + 1}`,
    width: 1280,
    height: 720,
  }))

  return {
    count: mockScreenshots.length,
    next: null,
    previous: null,
    results: mockScreenshots,
  }
}

