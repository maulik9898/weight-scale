import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from '../components/AppHeader'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: RootLayout
})



export function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}
