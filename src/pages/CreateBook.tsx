import { useCreateBookMutation } from "@/features/books/bookApi";
import { useNavigate } from "react-router-dom";
import BookForm from "@/components/BookForm";
import { toast } from "sonner";

export default function CreateBook() {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await createBook(data);
    toast.success("Book created");
    navigate("/books");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <BookForm onSubmit={handleSubmit} submitText="Create Book" />
    </div>
  );
}
