import axios from "axios";

export const httpClient = axios.create({
  headers: {
    nim: "1234",
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
