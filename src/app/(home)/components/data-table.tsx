"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
        <Link href="/create">
          <Button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700">
            <Plus size={20} strokeWidth={2.5} /> Tambah Buku
          </Button>
        </Link>
        <Input
          className="max-w-sm"
          onChange={event => table.getColumn("title")?.setFilterValue(event.target.value)}
          placeholder="Filter Judul..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        />
      </div>
      <Table>
        <TableHeader className="bg-blue-600 uppercase">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead className="text-white" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="rounded-md border">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow className="hover:bg-muted/50" data-state={row.getIsSelected() ? "selected" : null} key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-muted/50">
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-2 px-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between md:justify-start md:gap-5">
          <div>
            <span>Page</span>
            <strong>
              {" "}
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </div>
          <div className="flex items-center gap-1">
            Row Per Page:{" "}
            <select
              className="rounded-md border p-1"
              name="perpage"
              onChange={e => table.setPageSize(parseInt(e.target.value))}
              value={table.getState().pagination.pageSize}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-end md:space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} size="sm" variant="outline">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}
