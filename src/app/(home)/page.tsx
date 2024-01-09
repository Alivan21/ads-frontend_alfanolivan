import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import BookTable from "./components/book-table";
import { getAllBook } from "./services/all-book";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: getAllBook,
  });

  return (
    <section className="flex flex-col gap-5 rounded-md bg-white p-5 shadow-md">
      <h1 className="text-xl font-bold">Daftar Buku</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookTable />
      </HydrationBoundary>
    </section>
  );
}
