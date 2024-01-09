import { httpClient } from "@/libs/httpClient";
import { BaseResponse } from "@/types/BaseResponse";
import { Book } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useGetBookById(id: string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await httpClient.get<BaseResponse<Book>>(`/data/${id}`);
      if (res === undefined) return;
      return res.data;
    },
  });
}
