import { useState } from 'react';
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { productColumns } from './product-column';
import { Tables } from '@/types';

export const useProductTable = (data: Tables<'products'>[]) => {
	const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns: productColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getRowId: (row) => row.id!.toString(),
		autoResetPageIndex: false,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return {
		table,
		rowSelection,
		columnVisibility,
		columnFilters,
		sorting,
		setSorting,
		setColumnFilters,
		setColumnVisibility,
		setRowSelection,
	};
};
