import { httpClient } from "@/libs/httpClient";
import { BaseResponse } from "@/types/BaseResponse";
import { Book } from "@/types/book";

export async function getBookById(id: string) {
  const res = await httpClient.get<BaseResponse<Book>>(`/data/${id}`);
  if (res === undefined) return;
  return res.data;
}
