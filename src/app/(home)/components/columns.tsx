"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} variant="ghost">
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "author",
    header: "Penulis",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex flex-col gap-2 md:flex-row">
          <Link href={`/edit/${book.id}`}>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              <Pencil size={20} strokeWidth={2.5} />
            </Button>
          </Link>
          <Button size="sm" variant="destructive">
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
