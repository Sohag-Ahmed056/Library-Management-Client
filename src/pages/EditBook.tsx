import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "@/features/books/bookApi";
import BookForm from "@/components/BookForm";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams();
  const { data: book } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  if (!book) return <p>Loading...</p>;

  const handleSubmit = async (data: any) => {
    await updateBook({ id: id!, data });
    toast.success("Book updated");
    navigate("/books");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
      <BookForm initial={book} onSubmit={handleSubmit} submitText="Update Book" />
    </div>
  );
}
