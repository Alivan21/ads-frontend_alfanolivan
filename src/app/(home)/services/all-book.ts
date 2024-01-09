import { httpClient } from "@/libs/httpClient";
import { BaseResponse } from "@/types/BaseResponse";
import { Book } from "@/types/book";

export async function getAllBook() {
  const res = await httpClient.get<BaseResponse<Book[]>>("/data");
  if (res === undefined) return;
  return res.data;
}
