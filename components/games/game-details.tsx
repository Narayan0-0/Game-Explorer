"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col, Badge, Button, Alert, Carousel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "@/lib/features/library/librarySlice"
import type { RootState } from "@/lib/store"
import { fetchGameDetails, fetchGameScreenshots } from "@/lib/services/api"
import type { Game, Screenshot } from "@/lib/types"
import { Bookmark, BookmarkCheck } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { useUser } from "@clerk/nextjs"

export default function GameDetails({ id }: { id: string }) {
  const [game, setGame] = useState<Game | null>(null)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()
  const { isSignedIn } = useUser()
  const favorites = useSelector((state: RootState) => state.library.favorites)
  const isFavorite = game ? favorites.some((fav) => fav.id === game.id) : false

  useEffect(() => {
    const loadGameDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const gameData = await fetchGameDetails(id)
        setGame(gameData)

        const screenshotsData = await fetchGameScreenshots(id)
        setScreenshots(screenshotsData.results)
      } catch (err) {
        setError("Failed to load game details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadGameDetails()
  }, [id])

  const handleToggleFavorite = () => {
    if (isSignedIn && game) {
      dispatch(toggleFavorite(game))
    } else {
      alert("Please sign in to add games to your library")
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !game) {
    return <Alert variant="danger">{error || "Game not found"}</Alert>
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">{game.name}</h1>

          <div className="d-flex align-items-center mb-4">
            <div className="me-auto">
              {game.genres?.map((genre) => (
                <Badge key={genre.id} bg="secondary" className="me-2">
                  {genre.name}
                </Badge>
              ))}

              {game.rating > 0 && (
                <Badge bg={game.rating >= 4 ? "success" : "primary"} className="me-2">
                  {game.rating.toFixed(1)} / 5
                </Badge>
              )}

              <Badge bg="info">Released: {new Date(game.released).toLocaleDateString()}</Badge>
            </div>

            <Button
              variant={isFavorite ? "primary" : "outline-primary"}
              onClick={handleToggleFavorite}
              className="d-flex align-items-center"
            >
              {isFavorite ? (
                <>
                  <BookmarkCheck size={20} className="me-2" />
                  In Library
                </>
              ) : (
                <>
                  <Bookmark size={20} className="me-2" />
                  Add to Library
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>

      {screenshots.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Carousel>
              {screenshots.map((screenshot) => (
                <Carousel.Item key={screenshot.id}>
                  <img
                    className="d-block w-100 game-detail-image"
                    src={screenshot.image || "/placeholder.svg"}
                    alt={`Screenshot ${screenshot.id}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <h3>About</h3>
          <div dangerouslySetInnerHTML={{ __html: game.description || "No description available." }} />
        </Col>
      </Row>

      {game.platforms && game.platforms.length > 0 && (
        <Row className="mb-4">
          <Col>
            <h3>Platforms</h3>
            <div className="d-flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <Badge key={platform.platform.id} bg="dark" className="p-2">
                  {platform.platform.name}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>
      )}

      {game.tags && game.tags.length > 0 && (
        <Row className="mb-4">
          <Col>
            <h3>Tags</h3>
            <div className="d-flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <Badge key={tag.id} bg="secondary" className="p-2">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  )
}

