import { httpClient } from "@/libs/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await httpClient.delete(`/data/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Buku berhasil dihapus", {
        duration: 4000,
      });
    },
  });
}
