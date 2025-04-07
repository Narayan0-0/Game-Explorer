import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Game } from "@/lib/types"

interface LibraryState {
  favorites: Game[]
}

// Initialize state from localStorage if available
const getFavoritesFromStorage = (): Game[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("game-favorites")
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e)
      }
    }
  }
  return []
}

const initialState: LibraryState = {
  favorites: getFavoritesFromStorage(),
}

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Game>) => {
      const game = action.payload
      const index = state.favorites.findIndex((g) => g.id === game.id)

      if (index >= 0) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(game)
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("game-favorites", JSON.stringify(state.favorites))
      }
    },
    clearFavorites: (state) => {
      state.favorites = []

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("game-favorites")
      }
    },
  },
})

export const { toggleFavorite, clearFavorites } = librarySlice.actions
export default librarySlice.reducer

