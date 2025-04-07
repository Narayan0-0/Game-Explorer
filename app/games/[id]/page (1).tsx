import { Suspense } from "react"
import MainLayout from "@/components/layouts/main-layout"
import GameDetails from "@/components/games/game-details"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function GameDetailsPage({ params }: { params: { id: string } }) {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <GameDetails id={params.id} />
      </Suspense>
    </MainLayout>
  )
}

