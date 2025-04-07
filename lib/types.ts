export interface Game {
  id: number
  name: string
  slug: string
  description?: string
  background_image: string
  released: string
  rating: number
  genres?: Genre[]
  platforms?: Platform[]
  tags?: Tag[]
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface Platform {
  platform: {
    id: number
    name: string
    slug: string
  }
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
}

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface GameFilters {
  categories: string[]
  tags: string[]
  year: string
  sortBy: string
}

export interface GameQueryParams {
  page: number
  search?: string
  categories?: string[]
  tags?: string[]
  year?: string
  ordering?: string
}

