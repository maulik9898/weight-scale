import { flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react';
import { useDataTableContext } from '../data-table/DataTableContext';

export function ProductTable() {
	const { table, loading } = useDataTableContext();
	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{ loading ? (
							<TableRow>
								<TableCell colSpan={table.getAllColumns().length} className="h-24   gap-8">
									<div className="flex  gap-4 justify-center  text-muted-foreground ">
										<Loader2 className="h-8 w-8 animate-spin " />

										<span className="text-lg font-semibold ">Loading</span>
									</div>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className="" key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className="h-24 text-center text-muted-foreground"
								>
									<span className="text-lg font-semibold ">No Result</span>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
