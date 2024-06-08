import { useEffect, useState } from 'react'
import { ProductSelection } from './components/ProductSelection'
import { AddRemoveWeight } from './components/AddRemoveWeight'
import { supabase } from './supabase'
import { Session } from '@supabase/supabase-js'
import { Login } from './components/Login'
import useInventoryStore from './store'
import { TransactionList } from './components/TransactionList'
import { AppHeader } from './components/AppHeader'
import { BleConnect } from './components/BleConnect'

function App() {

  const [session, setSession] = useState<Session | null>(null)

  const selectedProductId = useInventoryStore((state) => state.selectedProductId);
  const device = useInventoryStore((state) => state.device);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    
  }, [])

  if (!session) {
    return <Login />
  }

  if(!device) {
    return <BleConnect />
  }

  return (
    <div className='h-screen w-full max-h-svh'>
      <AppHeader />
      <ProductSelection />
      {selectedProductId &&
        <>
          <AddRemoveWeight />
          <TransactionList />
        </>
      }
    </div>
  )
}

export default App
