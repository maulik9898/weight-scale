import { useEffect, useState } from 'react'
import { ProductSelection } from './components/ProductSelection'
import { AddRemoveWeight } from './components/AddRemoveWeight'
import { supabase } from './supabase'
import { Session } from '@supabase/supabase-js'
import { Login } from './components/Login'
import useInventoryStore from './store'
import { TransactionList } from './components/TransactionList'
import { AppHeader } from './components/AppHeader'
import { Button } from './components/ui/button'
import { useNavigate } from '@tanstack/react-router'

function App() {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)

  const selectedProductId = useInventoryStore((state) => state.selectedProductId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if(!session){
        navigate({ to: "/login"})
      }
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleConnect = () => {
    navigator.bluetooth.getDevices({
      acceptAllDevices: true
    })
      .then(device => {
        console.log("device ", device)
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  }

  if (!session) {
    return <Login />
  }
  return (
    <div className='h-screen w-full max-h-svh'>
      <AppHeader />
      <ProductSelection />
      {selectedProductId != undefined ?
        <>
          <AddRemoveWeight />
          <TransactionList />
        </> :
        <>
          <Button variant='outline' onClick={handleConnect} >Connect</Button>
        </>

      }
    </div>
  )
}

export default App
