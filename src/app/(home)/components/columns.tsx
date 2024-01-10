"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { formatPrice } from "@/utils/format-idr";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon, Pencil, Trash2 } from "lucide-react";
import DeleteModal from "./delete-modal";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: () => {
      return <span className="whitespace-nowrap uppercase">Judul</span>;
    },
    cell: ({ row }) => {
      return <span className="whitespace-nowrap">{row.getValue("title")}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      return <span className="line-clamp-2 max-w-md whitespace-nowrap">{row.getValue("description")}</span>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} variant="ghost">
          <span className="uppercase">Harga</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = formatPrice(row.getValue("price"));
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
          <Link href={`/detail/${book.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              <EyeIcon size={20} strokeWidth={2.5} />
            </Button>
          </Link>
          <Link href={`/edit/${book.id}`}>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              <Pencil size={20} strokeWidth={2.5} />
            </Button>
          </Link>
          <DeleteModal id={book.id} />
        </div>
      );
    },
  },
];
