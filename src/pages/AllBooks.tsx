import { useGetBooksQuery, useDeleteBookMutation } from "@/features/books/bookApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-center mt-10 text-lg font-medium">Loading books...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Books</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">ISBN</th>
              <th className="px-4 py-3">Copies</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((book) => (
              <tr
                key={book._id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3 font-medium">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.genre}</td>
                <td className="px-4 py-3">{book.isbn}</td>
                <td className="px-4 py-3">{book.copies}</td>
                <td className="px-4 py-3">
                  {book.copies > 0 ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    Edit
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                      </DialogHeader>
                      <p>
                        Are you sure you want to delete <strong>{book.title}</strong>?
                      </p>
                      <DialogFooter>
                        <DialogTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogTrigger>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            await deleteBook(book._id);
                            toast.success("Book deleted");
                          }}
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    onClick={() => navigate(`/borrow/${book._id}`)}
                  >
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
