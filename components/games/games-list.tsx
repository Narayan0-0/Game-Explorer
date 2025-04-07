"use client"

import { useEffect, useState } from "react"
import { Row, Col, Pagination, Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { fetchGames } from "@/lib/services/api"
import GameCard from "@/components/games/game-card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import type { Game } from "@/lib/types"

export default function GamesList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { searchQuery, filters } = useSelector((state: RootState) => state.games)

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetchGames({
          page: currentPage,
          search: searchQuery,
          categories: filters.categories,
          tags: filters.tags,
          year: filters.year,
          ordering: filters.sortBy,
        })

        setGames(response.results)
        setTotalPages(Math.ceil(response.count / 20)) // Assuming 20 items per page
      } catch (err) {
        setError("Failed to load games. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [currentPage, searchQuery, filters])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  if (games.length === 0) {
    return <Alert variant="info">No games found. Try adjusting your search or filters.</Alert>
  }

  return (
    <div>
      <h2 className="mb-4">{searchQuery ? `Search Results: ${searchQuery}` : "Popular Games"}</h2>

      <Row xs={1} sm={2} md={2} lg={3} className="g-4 mb-4">
        {games.map((game) => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = currentPage > 3 ? currentPage - 3 + i + 1 : i + 1

            if (pageNum <= totalPages) {
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              )
            }
            return null
          })}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </div>
  )
}

