"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookForm from "@/components/forms/BookForm";
import { BookFormType } from "@/types/book";
import toast from "react-hot-toast";
import { useCreateBook } from "../services/create-book";

function CreateForm() {
  const router = useRouter();
  const [form] = useState<BookFormType>({
    title: "",
    author: "",
    price: "" as unknown as number,
    description: "",
  });
  const { mutateAsync: createBook } = useCreateBook();

  const handleSubmit = async (bookData: BookFormType) => {
    try {
      await createBook(bookData);
      router.push("/");
    } catch (error) {
      toast.error("Gagal menambahkan buku");
    }
  };

  return <BookForm initialBook={form} onSubmit={handleSubmit} />;
}
export default CreateForm;
