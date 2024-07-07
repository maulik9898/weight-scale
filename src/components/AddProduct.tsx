import React from 'react';
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from '@/store';
import { supabase } from '@/supabase';
import { toast } from "sonner";
import { queryClient } from '@/main';

export function AddProduct() {
  const [name, setName] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a product.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('add_product', {
        p_name: name,
        p_user_id: user.id,
        p_initial_weight: parseFloat(weight)
      });

      if (error) throw error;

      toast.success("Product added successfully!");
      setOpen(false);  // Close the dialog
      setName("");
      setWeight("");
      queryClient.invalidateQueries({
        queryKey: ["products", user.id]
      })
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusIcon className="mr-2" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product here. Click save when you're done.
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="col-span-3"
                required
                step="0.1"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
