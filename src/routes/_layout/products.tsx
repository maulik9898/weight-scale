import { AddProduct } from '@/components/AddProduct'
import { DataTableProvider } from '@/components/data-table/DataTableContext';
import { DataTablePagination } from '@/components/data-table/DataTablePagination';
import { ProductTable } from '@/components/product-table/product-table'
import { useProductTable } from '@/components/product-table/useProductTable';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store';
import { supabase } from '@/supabase';
import { Tables } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { DownloadCloudIcon } from 'lucide-react';

export const Route = createFileRoute('/_layout/products')({
  component: Products
})


export function Products() {
  const user = useUserStore((state) => state.user)

  const { data: products, isLoading } = useQuery<Tables<'products'>[]>({
    queryKey: ['products', user?.id],
    queryFn:
      async () => {
        if (!user) throw new Error('Not authenticated');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', user.id)
        if (error) throw error;
        return data;
      },
    enabled: !!user
  });


  const { table } = useProductTable(products || [])

  const downloadCSV = () => {
    if (!products || products.length === 0 || !user) {
      alert('No products to download or user not logged in');
      return;
    }

    const currentDate = new Date().toLocaleString();

    // Create header content
    const headerContent = [
      'Product Export',
      `User: ${user.email}`,
      `Date: ${currentDate}`,
      '',  // Empty line for separation
    ].join('\n');

    // Define the column headers
    const columnHeaders = ['ID', 'Name', 'Weight'];

    // Create CSV content
    const csvContent = [
      headerContent,
      columnHeaders.join(','), // Column header row
      ...products.map(product =>
        `${product.id},${product.name},${product.weight}`
      )
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'products_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className='flex flex-col gap-2 p-4 w-full'>
      <AddProduct />
      <div className='flex gap-2 justify-between items-center '>

        <h1 className="text-2xl font-bold mt-4">Your Products</h1>
        <Button 
          onClick={downloadCSV}
          disabled={isLoading || !products || products.length === 0 || !user} 
          size='sm' 
          variant='secondary'>
            <DownloadCloudIcon className='mr-2' />
            Download
        </Button>
      </div>
      <DataTableProvider table={table} loading={isLoading}>
        <ProductTable />
        <DataTablePagination />
      </DataTableProvider>
    </div>
  )
}
