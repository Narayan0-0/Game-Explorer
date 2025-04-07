"use client"

import { Row, Col, Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import GameCard from "@/components/games/game-card"

export default function LibraryList() {
  const favorites = useSelector((state: RootState) => state.library.favorites)

  if (favorites.length === 0) {
    return <Alert variant="info">Your library is empty. Add games by clicking the bookmark icon on game cards.</Alert>
  }

  return (
    <div>
      <h2 className="mb-4">My Library</h2>

      <Row xs={1} sm={2} md={2} lg={3} className="g-4">
        {favorites.map((game) => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

