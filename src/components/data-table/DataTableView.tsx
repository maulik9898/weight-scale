import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from  '@/components/ui/scroll-area';

interface DataTableViewProps<TData> {
	table: Table<TData>;
	getColumnTitle: (data: string) => string;
}
function DataTableView<TData>({ table, getColumnTitle }: DataTableViewProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={'sm'} variant="outline" className="ml-auto">
					<Settings2 className="h-4 w-4 mr-2" />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ScrollArea className="h-[200px]">
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									onSelect={(e) => e.preventDefault()}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{getColumnTitle(column.id)}
								</DropdownMenuCheckboxItem>
							);
						})}
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default DataTableView;
