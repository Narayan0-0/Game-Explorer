import { Suspense } from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import MainLayout from "@/components/layouts/main-layout"
import LibraryList from "@/components/library/library-list"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default async function LibraryPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <LibraryList />
      </Suspense>
    </MainLayout>
  )
}

