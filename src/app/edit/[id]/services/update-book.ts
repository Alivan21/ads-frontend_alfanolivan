import { httpClient } from "@/libs/httpClient";
import { Book } from "@/types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Book) => {
      const formData = new FormData();

      formData.append("title", props.title);
      formData.append("author", props.author);
      formData.append("price", props.price.toString());
      formData.append("description", props.description);
      await httpClient.put(`/data/${props.id}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Buku berhasil diupdate", {
        duration: 4000,
      });
    },
  });
}
