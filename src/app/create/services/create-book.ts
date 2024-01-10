import { httpClient } from "@/libs/httpClient";
import { BookFormType } from "@/types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: BookFormType) => {
      const formData = new FormData();
      formData.append("title", props.title);
      formData.append("author", props.author);
      formData.append("price", props.price.toString());
      formData.append("description", props.description);

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
