"use client";

import Spinner from "@/components/spinner";
import { formatPrice } from "@/utils/format-idr";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../services/book-by-id";

function DetailSection({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
  });

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Judul</h2>
        <p>{data.data.title}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Deskripsi</h2>
        <p>{data.data.description}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Penulis</h2>
        <p>{data.data.author}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Harga</h2>
        <p>{formatPrice(data.data.price)}</p>
      </div>
    </div>
  );
}
export default DetailSection;
