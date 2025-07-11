import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useBorrowBookMutation } from "@/features/books/bookApi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BorrowBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  if (isLoading || !book) return <p>Loading book details...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity > book.copies) {
      toast.error("Quantity exceeds available copies");
      return;
    }

    try {
      await borrowBook({
        book: bookId!,
        quantity,
        dueDate,
      }).unwrap();

      toast.success("📚 Book borrowed successfully!");
      navigate("/borrow");
    } catch (error) {
      toast.error("❌ Failed to borrow the book");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-2">Borrow Book</h2>
        <p className="text-gray-600 mb-4">{book.title} by {book.author}</p>

        <div>
          <label className="block mb-1 text-sm font-medium">Quantity (Available: {book.copies})</label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            max={book.copies}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Due Date</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Confirm Borrow
        </Button>
      </form>
    </div>
  );
}
