import { useState, useCallback, useEffect } from 'react';

const SERVICE_UUID = 0xe001;
const CHARACTERISTIC_UUID_RX = 0xe003;

export function useBLEWeight() {
  const [weight, setWeight] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  const handleWeightData = useCallback((event: any) => {
    const value = new TextDecoder().decode(event.target.value);
    const data = JSON.parse(value.slice(0, -1));
    const weightValue = data.weight*0.01;
    setWeight(weightValue);
    console.log('Weight:', value); // Log weight to console
  }, []);

  const connect = useCallback(async () => {
    try {
      const newDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }]
      });
      console.log('Device', newDevice);
      setDevice(newDevice);

      const server = await newDevice.gatt?.connect();
      const service = await server?.getPrimaryService(SERVICE_UUID);
      const rxCharacteristic = await service?.getCharacteristic(CHARACTERISTIC_UUID_RX);
      await rxCharacteristic?.startNotifications();
      rxCharacteristic?.addEventListener('characteristicvaluechanged', handleWeightData);
      
      setIsConnected(true);
    } catch (error) {
      console.error('Error', error);
      setIsConnected(false);
    }
  }, [handleWeightData]);

  const disconnect = useCallback(async () => {
    if (device && device.gatt?.connected) {
      device.gatt.disconnect();
    }
    setIsConnected(false);
    setDevice(null);
  }, [device]);

  useEffect(() => {
    return () => {
      if (device && device.gatt?.connected) {
        device.gatt.disconnect();
      }
    };
  }, [device]);

  return { weight, isConnected, connect, disconnect };
}
