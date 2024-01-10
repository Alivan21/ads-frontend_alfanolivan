"use client";

import { useRouter } from "next/navigation";
import BookForm from "@/components/forms/BookForm";
import Spinner from "@/components/spinner";
import { Book } from "@/types/book";
import toast from "react-hot-toast";
import { useGetBookById } from "../services/book-by-id";
import { useUpdateBook } from "../services/update-book";

function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading } = useGetBookById(id);
  const { mutateAsync: updateBook } = useUpdateBook();

  const handleSubmit = async (updatedBookData: Book) => {
    try {
      await updateBook(updatedBookData);
      router.push("/");
    } catch (error) {
      toast.error("Gagal mengubah buku");
    }
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return <BookForm initialBook={data?.data} onSubmit={handleSubmit} />;
}

export default EditForm;
