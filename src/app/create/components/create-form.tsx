"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/types/book";
import toast from "react-hot-toast";
import { useCreateBook } from "../services/create-book";

type BookForm = Omit<Book, "id">;

function CreateForm() {
  const router = useRouter();
  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    price: "" as unknown as number,
    description: "",
  });
  const { isPending, mutateAsync: createBook } = useCreateBook(form);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBook();
      router.push("/");
    } catch (error) {
      toast.error("Gagal menambahkan buku");
    }
  };

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
        {isPending ? "Menambahkan..." : "Tambah"}
      </Button>
    </form>
  );
}
export default CreateForm;
