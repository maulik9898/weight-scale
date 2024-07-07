import { AddWeight } from "./AddWeight"
import { RemoveWeight } from "./RemoveWeight"
import { useEffect, useState } from "react";

function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function AddRemoveWeight() {

  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    // Generate a new random number every 3 seconds
    const interval = setInterval(() => {
      const min = 1;
      const max = 100;
      const randomNumber = getRandomNumberBetween(min, max);
      setNumber(randomNumber);
    }, 3000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
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
