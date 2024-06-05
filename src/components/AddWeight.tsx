import { adjustProductWeight } from "@/supabase";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function AddWeight() {
  const [number, setNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false)

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

  const handleClick = async () => {
    setLoading(true)
    try {
      await adjustProductWeight(number)
    } catch (error) {
      console.log("Error ", error)
    }
    setLoading(false)
  }
  return (
    <div className="flex flex-col gap-4  justify-center items-center w-full">
      <h1 className="font-semibold   text-gray-400 font-mono text-8xl">{number}</h1>
      <Button disabled={loading} onClick={handleClick} variant="default" className="w-full" >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add</Button>
    </div>
  )
}
