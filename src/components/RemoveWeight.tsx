import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { adjustProductWeight } from "@/supabase";
import { Loader2 } from "lucide-react";

export function RemoveWeight({ weight }: { weight: number }) {
  const [loading, setLoading] = useState(false)
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
    <Button disabled={loading || weight == undefined} onClick={handleClick} variant="destructive" className="w-full">
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Remove</Button>
  )
}
