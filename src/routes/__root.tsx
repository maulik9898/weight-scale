import { Toaster } from '@/components/ui/sonner'
import { supabase } from '@/supabase'
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect } from 'react'
import { Z_VERSION_ERROR } from 'zlib'

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
