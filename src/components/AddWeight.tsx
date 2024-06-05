import { adjustProductWeight } from "@/supabase";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";


export function AddWeight({ weight }: { weight: number }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await adjustProductWeight(weight)
    } catch (error) {
      console.log("Error ", error)
    }
    setLoading(false)
  }
  return (
    <Button disabled={loading} onClick={handleClick} variant="default" className="w-full" >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add</Button>
  )
}
