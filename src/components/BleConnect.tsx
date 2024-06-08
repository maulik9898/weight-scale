
/// <reference types="web-bluetooth" />

import { Button } from './ui/button'
import useInventoryStore from '@/store'
export const SERVICE_UUID = 0xe001;
export const CHARACTERISTIC_UUID_TX = 0xe002;
export const CHARACTERISTIC_UUID_RX = 0xe003;

export const BleConnect = () => {

    const setDevice = useInventoryStore((state) => state.setDevice);

    const selectDevice = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: [SERVICE_UUID]}]
            })
            console.log('Device', device)
            setDevice(device)
        } catch (error) {
            console.error('Error', error)
            setDevice(null)
        }
    
    }
  return (
    <div className='justify-center flex flex-col items-center h-full'>
 <Button onClick={selectDevice}>Connect to Weight Scale</Button>
    </div>
   
  )
}
