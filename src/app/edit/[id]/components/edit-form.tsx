"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/types/book";
import toast from "react-hot-toast";
import { useGetBookById } from "../services/book-by-id";
import { useUpdateBook } from "../services/update-book";

function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading } = useGetBookById(id);
  const [form, setForm] = useState<Book>({
    id: "" as unknown as number,
    title: "",
    author: "",
    price: "" as unknown as number,
    description: "",
  });

  useEffect(() => {
    if (data) {
      setForm(data.data);
    }
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const { isPending, mutateAsync: updateBook } = useUpdateBook(form);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateBook();
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

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="title">
            Judul
          </label>
          <Input id="title" onChange={handleChange} placeholder="Masukkan judul" value={form.title} />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="author">
            Penulis
          </label>
          <Input id="author" onChange={handleChange} placeholder="Masukkan nama pengarang" value={form.author} />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium" htmlFor="price">
          Harga
        </label>
        <Input
          id="price"
          onChange={handleChange}
          onInput={handleInput}
          pattern="[0-9]*"
          placeholder="Masukkan harga"
          type="text"
          value={form.price}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-2 font-medium" htmlFor="description">
          Deskripsi
        </label>
        <Textarea
          id="description"
          onChange={handleChange}
          placeholder="Ketik deskripsi disini"
          value={form.description}
        />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={isPending} type="submit">
        {isPending ? "Mengubah..." : "Ubah"}
      </Button>
    </form>
  );
}

export default EditForm;
