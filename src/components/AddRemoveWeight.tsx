import { AddWeight } from "./AddWeight"
import { RemoveWeight } from "./RemoveWeight"
import useInventoryStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { SERVICE_UUID, CHARACTERISTIC_UUID_RX } from "./BleConnect";


export function AddRemoveWeight() {

  const selectedProductId = useInventoryStore((state) => state.selectedProductId);
  const device = useInventoryStore((state) => state.device);

  const productQuery = useQuery({
    queryKey: ["product", selectedProductId],
    queryFn: async () => {
      const { data } = await supabase.from("products").select().eq("id", selectedProductId!)
      return data && data[0] || undefined
    },
    enabled: selectedProductId != undefined || selectedProductId != null
  })
  const [number, setNumber] = useState<number>(0);
  const connectAndSubscribe = async() => {
    if(device == null) return
    const server = await device.gatt?.connect();
    const service = await server?.getPrimaryService(SERVICE_UUID);
    const rxCharacteristic = await service?.getCharacteristic(CHARACTERISTIC_UUID_RX);

    await rxCharacteristic?.startNotifications();
    rxCharacteristic?.addEventListener('characteristicvaluechanged', handleWeightData);
  }

  useEffect(() => {
    // Generate a new random number every 3 seconds
    if(device){
      try {
        connectAndSubscribe()
      } catch (error) {
        console.log("error ", error)
      }
     
    }

    // Clean up the interval on component unmount
  }, []);


  function handleWeightData(event: any) {
    const value = new TextDecoder().decode(event.target.value);
    //remove the 0x04 delimiter in last byte
  
      const data = JSON.parse(value.slice(0, -1));
      // console.log(value);
      console.log(data);
      const weightValue = data.weight;
      setNumber(weightValue)
  }
  return (
    <>
      <div className=" p-4 text-2xl border-b rounded-none text-gray-500 font-semibold flex justify-between gap-2 w-full">
        <p>Inventory</p>
        <p className="">{productQuery.data?.weight} KG</p>
      </div>
    <div className="bg-muted/40 p-4 flex flex-col gap-4 justify-center items-center">
      
      <div className="flex flex-row gap-2">
        <h1 className="font-semibold font-mono text-8xl text-green-500 animate-pulse">{number}</h1>
        <p className="self-end pb-2 text-lg font-bold text-green-500 animate-pulse">KG</p>
      </div>
      <div className="flex gap-2 w-full">
        <AddWeight weight={number} />
        <RemoveWeight weight={number} />
      </div>
    </div>
    </>
  )

}
