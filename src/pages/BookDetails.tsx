import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "@/features/books/bookApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useGetBookQuery(id!);

  if (isLoading) return <p>Loading book details...</p>;
  if (error || !book) return <p>Book not found.</p>;

  return (
    <div className="mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {book.title}
            <Badge
              variant={book.copies > 0 ? "default" : "destructive"}
              className="ml-3"
            >
              {book.copies > 0 ? "Available" : "Unavailable"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Copies:</strong> {book.copies}</p>
          {book.description && (
            <p><strong>Description:</strong> {book.description}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between gap-2">
        <Button variant="secondary" onClick={() => navigate("/books")}>
          ← Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/edit-book/${book._id}`)}>
            Edit
          </Button>
          <Button onClick={() => navigate(`/borrow/${book._id}`)}>
            Borrow
          </Button>
        </div>
      </div>
    </div>
  );
}
