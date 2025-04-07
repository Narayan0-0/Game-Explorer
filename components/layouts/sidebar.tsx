"use client"

import { useState, useEffect } from "react"
import { Card, Form, ListGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setFilters } from "@/lib/features/games/gamesSlice"

// These would typically come from the API
const CATEGORIES = [
  { id: "action", name: "Action" },
  { id: "adventure", name: "Adventure" },
  { id: "rpg", name: "RPG" },
  { id: "shooter", name: "Shooter" },
  { id: "puzzle", name: "Puzzle" },
  { id: "racing", name: "Racing" },
  { id: "sports", name: "Sports" },
  { id: "strategy", name: "Strategy" },
]

const TAGS = [
  { id: "singleplayer", name: "Singleplayer" },
  { id: "multiplayer", name: "Multiplayer" },
  { id: "open-world", name: "Open World" },
  { id: "first-person", name: "First Person" },
  { id: "third-person", name: "Third Person" },
  { id: "sci-fi", name: "Sci-Fi" },
  { id: "fantasy", name: "Fantasy" },
]

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)

export default function Sidebar() {
  const dispatch = useDispatch()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("popularity")

  useEffect(() => {
    dispatch(
      setFilters({
        categories: selectedCategories,
        tags: selectedTags,
        year: selectedYear,
        sortBy,
      }),
    )
  }, [selectedCategories, selectedTags, selectedYear, sortBy, dispatch])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  return (
    <div className="sidebar">
      <Card className="mb-4">
        <Card.Header className="bg-dark text-white">
          <h5 className="mb-0">Filters</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Sort By</Form.Label>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="released">Release Date</option>
                <option value="name">Name</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Release Year</Form.Label>
              <Form.Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">All Years</option>
                {YEARS.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Categories</Form.Label>
              <ListGroup variant="flush">
                {CATEGORIES.map((category) => (
                  <ListGroup.Item key={category.id} className="border-0 py-1">
                    <Form.Check
                      type="checkbox"
                      id={`category-${category.id}`}
                      label={category.name}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Tags</Form.Label>
              <ListGroup variant="flush">
                {TAGS.map((tag) => (
                  <ListGroup.Item key={tag.id} className="border-0 py-1">
                    <Form.Check
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      label={tag.name}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

