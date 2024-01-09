import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CreateForm from "./components/create-form";

function Create() {
  return (
    <section className="flex flex-col gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex items-center gap-1.5">
        <Link href="/">
          <button className="flex items-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-700">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
        </Link>
        <h1 className="text-xl font-bold">Tambah Buku</h1>
      </div>
      <CreateForm />
    </section>
  );
}
export default Create;
