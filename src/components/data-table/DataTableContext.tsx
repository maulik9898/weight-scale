import React from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';

interface DataTableContextValue<TData> {
	table: TanstackTable<TData>;
	loading: boolean;
	children?: React.ReactNode;
}

const DataTableContext = React.createContext<DataTableContextValue<any> | undefined>(undefined);

export const useDataTableContext = <TData,>() => {
	const context = React.useContext(DataTableContext) as DataTableContextValue<TData> | undefined;
	if (!context) {
		throw new Error(
			'useTableContext must be used within a TableProvider. ' +
				'Please ensure that your component is wrapped in a TableProvider component.'
		);
	}
	return context;
};

export function DataTableProvider<TData>({
	table,
	loading,
	children,
}: DataTableContextValue<TData>) {
	return (
		<DataTableContext.Provider value={{ table, loading }}>{children}</DataTableContext.Provider>
	);
}
