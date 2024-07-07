import {  useState } from "react";
import { AddWeight } from "./AddWeight";
import { RemoveWeight } from "./RemoveWeight";
import { Button } from "@/components/ui/button";
import { Bluetooth, BluetoothConnected } from "lucide-react";

export const SERVICE_UUID = 0xe001;
export const CHARACTERISTIC_UUID_TX = 0xe002;
export const CHARACTERISTIC_UUID_RX = 0xe003;

// const DEBUG_MODE = process.env.NODE_ENV === 'development';

// function getRandomNumberBetween(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

export function AddRemoveWeight() {
  const [weight, setWeight] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  const connectAndSubscribe = async () => {
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
  };

  const disconnect = async () => {
    if (device && device.gatt?.connected) {
      device.gatt.disconnect();
    }
    setIsConnected(false);
    setDevice(null);
  };

  function handleWeightData(event: any) {
    const value = new TextDecoder().decode(event.target.value);
    const data = JSON.parse(value.slice(0, -1));
    console.log(data);
    const weightValue = data.weight;
    setWeight(weightValue);
  }

  // useEffect(() => {
  //   if (DEBUG_MODE && isConnected) {
  //     const interval = setInterval(() => {
  //       const randomNumber = getRandomNumberBetween(1, 100);
  //       setWeight(randomNumber);
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isConnected]);

  return (
    <div className="bg-muted/40 flex flex-col gap-4 w-full">
      {isConnected ? (
        <>
          <div className="flex p-2 justify-between items-center w-full bg-green-100 text-green-800  rounded-none">
            <div className="flex items-center gap-2">
              <BluetoothConnected size={16} />
              <span>Connected</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={disconnect}
              className="text-green-800 hover:text-green-900 hover:bg-green-200"
            >
              Disconnect
            </Button>
          </div>
          <div className="flex   justify-center">
            <h1 className="font-semibold font-mono text-8xl text-green-500">
              {weight}
            </h1>
            <p className="text-lg  font-bold text-green-500">KG</p>
          </div>
          <div className="flex p-4 gap-2 w-full">
            <AddWeight weight={weight} />
            <RemoveWeight weight={weight} />
          </div>
        </>
      ) : (
        <div className="w-full p-4">
          <Button
            variant="outline"
            onClick={connectAndSubscribe}
            className="w-full  flex items-center justify-center gap-2"
          >
            <Bluetooth size={16} />
            Connect Device
          </Button>
        </div>
      )}
    </div>
  );
}
