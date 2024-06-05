import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { adjustProductWeight } from "@/supabase";
import { Loader2 } from "lucide-react";

export function RemoveWeight() {
  const [loading, setLoading] = useState(false)
  const [weight, setWeight] = useState<number>()
  const handleClick = async () => {
    setLoading(true)
    try {
      await adjustProductWeight(-weight!)
    } catch (error) {
      console.log("Error ", error)
    }
    setLoading(false)
  }
  return (
    <div className="flex flex-col gap-4  justify-center items-center w-full">
      <Input value={weight} onChange={(value) => setWeight(parseInt(value.currentTarget.value))} type="number" className="text-7xl font-semibold h-fit " />
      <Button disabled={loading || weight == undefined} onClick={handleClick} variant="destructive" className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Remove</Button>
    </div>
  )
}
