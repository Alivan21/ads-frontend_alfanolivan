"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useDeleteBook } from "../services/delete-book";

function DeleteModal({ id }: { id: number }) {
  const { mutateAsync: deleteBook } = useDeleteBook();

  const handleDelete = async () => {
    await deleteBook(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Buku</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus buku ini? Buku yang sudah dihapus tidak dapat dikembalikan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleDelete} variant="destructive">
              Hapus
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Kembali
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteModal;
