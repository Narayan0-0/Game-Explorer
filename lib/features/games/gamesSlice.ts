import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { GameFilters } from "@/lib/types"

interface GamesState {
  searchQuery: string
  filters: GameFilters
}

const initialState: GamesState = {
  searchQuery: "",
  filters: {
    categories: [],
    tags: [],
    year: "",
    sortBy: "popularity",
  },
}

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFilters: (state, action: PayloadAction<GameFilters>) => {
      state.filters = action.payload
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const { setSearchQuery, setFilters, resetFilters } = gamesSlice.actions
export default gamesSlice.reducer

