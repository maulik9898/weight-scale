import { Tables } from "@/types";

function convertTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString()
}


export function Transaction( { tr }: { tr: Tables<'transactions'>}) {
  const time = convertTimestamp(tr.timestamp!)
  return (
    <div className={`border-b rounded-none p-2 justify-between px-4 flex gap-8 ${tr.weight_change < 0 ? 'bg-destructive' : ''}`}>
      <p className={` ${tr.weight_change < 0 ? "text-destructive-forground" : 'text-muted-foreground'}`}>{time}</p>
      <p className="font-mono">{tr.weight_change}</p>
    </div>)
}
