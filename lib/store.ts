import { configureStore } from "@reduxjs/toolkit"
import gamesReducer from "@/lib/features/games/gamesSlice"
import libraryReducer from "@/lib/features/library/librarySlice"

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    library: libraryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

