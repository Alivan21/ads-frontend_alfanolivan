"use client";

import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getAllBook } from "../services/all-book";
import { columns } from "./columns";
import { DataTable } from "./data-table";

function BookTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBook,
  });

  if (isLoading || !data) {
    return <Spinner />;
  }

  return <DataTable columns={columns} data={data?.data} />;
}
export default BookTable;
