"use client";

import { ChangeEvent } from "react";
import { Book, BookFormType } from "@/types/book";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type BookFormProps = {
  initialBook: Book | BookFormType;
  onSubmit: SubmitHandler<Book>;
};

function BookForm(props: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Book>({
    defaultValues: props.initialBook,
  });

  const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(props.onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="title">
            Judul
          </label>
          <Input id="title" {...register("title", { required: true })} placeholder="Masukkan judul" />
          {errors.title ? <p className="text-sm text-red-500">{errors.title.message}</p> : null}
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="author">
            Penulis
          </label>
          <Input id="author" {...register("author", { required: true })} placeholder="Masukkan nama pengarang" />
          {errors.author ? <p className="text-sm text-red-500">{errors.author.message}</p> : null}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium" htmlFor="price">
          Harga
        </label>
        <Input
          id="price"
          {...register("price", { required: true, pattern: /^\d+$/ })}
          onInput={handleInputPrice}
          pattern="[0-9]*"
          placeholder="Masukkan harga"
          type="text"
        />
        {errors.price ? <p className="text-sm text-red-500">{errors.price.message}</p> : null}
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-2 font-medium" htmlFor="description">
          Deskripsi
        </label>
        <Textarea
          id="description"
          {...register("description", { required: true })}
          placeholder="Ketik deskripsi disini"
          rows={5}
        />
        {errors.description ? <p className="text-sm text-red-500">{errors.description.message}</p> : null}
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

export default BookForm;
