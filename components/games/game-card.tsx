"use client"

import type React from "react"

import { Card, Badge } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "@/lib/features/library/librarySlice"
import type { RootState } from "@/lib/store"
import type { Game } from "@/lib/types"
import { Bookmark, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

export default function GameCard({ game }: { game: Game }) {
  const dispatch = useDispatch()
  const { isSignedIn } = useUser()
  const favorites = useSelector((state: RootState) => state.library.favorites)
  const isFavorite = favorites.some((fav) => fav.id === game.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isSignedIn) {
      dispatch(toggleFavorite(game))
    } else {
      // Could show a sign-in prompt here
      alert("Please sign in to add games to your library")
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "success"
    if (rating >= 3) return "primary"
    if (rating >= 2) return "warning"
    return "danger"
  }

  return (
    <Link href={`/games/${game.id}`} passHref style={{ textDecoration: "none" }}>
      <Card className="h-100 game-card">
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={game.background_image || "/placeholder.svg?height=200&width=400"}
            alt={game.name}
            height={200}
            style={{ objectFit: "cover" }}
          />

          {game.rating > 0 && (
            <Badge bg={getRatingColor(game.rating)} className="rating-badge">
              {game.rating.toFixed(1)}
            </Badge>
          )}

          <button className="btn btn-light bookmark-btn" onClick={handleToggleFavorite}>
            {isFavorite ? <BookmarkCheck size={20} className="text-primary" /> : <Bookmark size={20} />}
          </button>
        </div>

        <Card.Body>
          <Card.Title className="text-truncate">{game.name}</Card.Title>
          <div className="mb-2">
            {game.genres?.slice(0, 2).map((genre) => (
              <Badge key={genre.id} bg="secondary" className="me-1">
                {genre.name}
              </Badge>
            ))}
          </div>
          <Card.Text className="small text-muted">Released: {new Date(game.released).toLocaleDateString()}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

