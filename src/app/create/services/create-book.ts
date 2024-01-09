import { httpClient } from "@/libs/httpClient";
import { Book } from "@/types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type BookForm = Omit<Book, "id">;

export function useCreateBook(props: BookForm) {
  const queryClient = useQueryClient();
  const formData = new FormData();

  formData.append("title", props.title);
  formData.append("author", props.author);
  formData.append("price", props.price.toString());
  formData.append("description", props.description);

  return useMutation({
    mutationFn: async () => {
      await httpClient.post("/data", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Buku berhasil ditambahkan", {
        duration: 4000,
      });
    },
  });
}
