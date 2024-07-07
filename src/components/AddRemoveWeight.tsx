import { useBLEWeight } from "@/hooks/useBLEWeight";
import { AddWeight } from "./AddWeight";
import { RemoveWeight } from "./RemoveWeight";
import { Button } from "@/components/ui/button";
import { Bluetooth, BluetoothConnected } from "lucide-react";

export function AddRemoveWeight() {
  const { weight, isConnected, connect, disconnect } = useBLEWeight();

  return (
    <div className="bg-muted/40 flex flex-col gap-4 w-full">
      {isConnected ? (
        <>
          <div className="flex p-2 justify-between items-center w-full bg-green-100 text-green-800 rounded-none">
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
          <div className="flex justify-center">
            <h1 className="font-semibold font-mono text-8xl text-green-500">
              {weight}
            </h1>
            <p className="text-lg font-bold text-green-500">KG</p>
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
            onClick={connect}
            className="w-full flex items-center justify-center gap-2"
          >
            <Bluetooth size={16} />
            Connect Device
          </Button>
        </div>
      )}
    </div>
  );
}
