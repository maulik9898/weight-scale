import { ColumnDef } from "@tanstack/react-table"
import { Tables } from "@/types"
import { Checkbox } from "../ui/checkbox"
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader"

export type Product = {
  id: string
  name: string
  weight: number
  user_id: string
}

export const productColumns: ColumnDef<Tables<'products'>>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getProductColumnTitle(column.id)} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getProductColumnTitle(column.id)} />
    ),
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getProductColumnTitle(column.id)} />
    ),
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue("weight"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "kilogram",
        unitDisplay: "short",
      }).format(weight)
      return <div className="font-medium">{formatted}</div>
    },
  },
]
export function getProductColumnTitle(columnId: string): string {
  switch (columnId) {
    case 'id':
      return 'ID';
    case 'name':
      return 'NAME';
    default:
      return columnId.toUpperCase();
  }
}
