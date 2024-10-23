import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useUserStore } from "@/store";
  import { supabase } from "@/supabase";
  import { queryClient } from "@/main";
  import { toast } from "sonner";
  import { PencilIcon } from "lucide-react";
  import { useState } from "react";
  
  interface EditProductProps {
    productId: number;
    currentName: string;
  }
  
  export function EditProduct({ productId, currentName }: EditProductProps) {
    const [name, setName] = useState(currentName);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const user = useUserStore((state) => state.user);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (!user) {
        toast.error("You must be logged in to edit a product.");
        return;
      }
  
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('products')
          .update({ name })
          .eq('id', productId)
          .eq('user_id', user.id);
  
        if (error) throw error;
  
        toast.success("Product updated successfully!");
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["products", user.id]
        });
      } catch (error) {
        toast.error("Failed to update product. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to your product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }