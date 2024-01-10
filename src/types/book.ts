export type Book = {
  id: number;
  title: string;
  description: string;
  price: number;
  author: string;
};

export type BookFormType = Omit<Book, "id">;
