import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { useUserStore } from "@/store";
  import { supabase } from "@/supabase";
  import { queryClient } from "@/main";
  import { toast } from "sonner";
  import { Trash2 } from "lucide-react";
  
  interface DeleteProductProps {
    productId: number;
  }
  
  export function DeleteProduct({ productId }: DeleteProductProps) {
    const user = useUserStore((state) => state.user);
  
    const handleDelete = async () => {
      if (!user) {
        toast.error("You must be logged in to delete a product.");
        return;
      }
  
      try {
        const { error } = await supabase.rpc('delete_product', {
          p_product_id: productId,
          p_user_id: user.id
        });
  
        if (error) throw error;
  
        toast.success("Product deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: ["products", user.id]
        });
      } catch (error) {
        toast.error("Failed to delete product. Please try again.");
      }
    };
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }