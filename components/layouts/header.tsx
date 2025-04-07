"use client"

import type React from "react"

import { useState } from "react"
import { Navbar, Container, Form, Button, Nav } from "react-bootstrap"
import { useRouter, usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { setSearchQuery } from "@/lib/features/games/gamesSlice"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { List, Bookmark, Search } from "lucide-react"
import Link from "next/link"

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [searchInput, setSearchInput] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { isSignedIn } = useUser()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchQuery(searchInput))

    if (pathname !== "/") {
      router.push("/")
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container fluid>
        <Button variant="outline-light" className="me-2 d-md-none" onClick={toggleSidebar}>
          <List size={20} />
        </Button>

        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <img src="/placeholder.svg?height=30&width=30" alt="Game Explorer Logo" className="me-2" />
          <span className="fw-bold">Game Explorer</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search games..."
              className="me-2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              <Search size={20} />
            </Button>
          </Form>

          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/library" className="d-flex align-items-center">
              <Bookmark size={20} className="me-1" />
              <span>Library</span>
            </Nav.Link>

            <div className="ms-3 d-flex align-items-center">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <Button variant="outline-light">Sign In</Button>
                </SignInButton>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

