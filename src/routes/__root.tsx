import { Toaster } from '@/components/ui/sonner'
import { supabase } from '@/supabase'
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: Root
})
function Root() {
  const navigate = useNavigate()


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate({ to: "/login" })
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate({ to: "/login" })
      } else {
        navigate({to: "/"})
      }
    })
  }, [])

  return (
    <div className='h-screen w-full max-h-svh'>
      <Outlet />
      <Toaster richColors={true} />
    </div>
  )
}
