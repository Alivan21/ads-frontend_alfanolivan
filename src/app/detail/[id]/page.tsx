import Link from "next/link";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import DetailSection from "./components/detail-section";
import { getBookById } from "./services/book-by-id";

async function Detail({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["book", params.id],
    queryFn: () => getBookById(params.id),
  });

  return (
    <section className="flex flex-col gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex items-center gap-1.5">
        <Link href="/">
          <button className="flex items-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-700">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
        </Link>
        <h1 className="text-xl font-bold">Detail Buku</h1>
      </div>
      <hr />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DetailSection id={params.id} />
      </HydrationBoundary>
    </section>
  );
}
export default Detail;
