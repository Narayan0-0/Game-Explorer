"use client"

import type React from "react"

import { Container, Row, Col } from "react-bootstrap"
import Header from "@/components/layouts/header"
import Sidebar from "@/components/layouts/sidebar"
import { useState } from "react"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header toggleSidebar={toggleSidebar} />
      <Container fluid className="flex-grow-1 py-4">
        <Row>
          {showSidebar && (
            <Col lg={3} md={4} className="d-none d-md-block">
              <Sidebar />
            </Col>
          )}
          <Col lg={showSidebar ? 9 : 12} md={showSidebar ? 8 : 12} xs={12}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

