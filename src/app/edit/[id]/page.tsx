import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EditForm from "./components/edit-form";

function EditPage({ params }: { params: { id: string } }) {
  return (
    <section className="flex flex-col gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex items-center gap-1.5">
        <Link href="/">
          <button className="flex items-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-700">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
        </Link>
        <h1 className="text-xl font-bold">Ubah Buku</h1>
      </div>
      <EditForm id={params.id} />
    </section>
  );
}
export default EditPage;
