import { useGetBorrowSummaryQuery } from "@/features/books/bookApi";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📊 Borrow Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Book Title</th>
              <th className="p-2">ISBN</th>
              <th className="p-2">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((summary: any, idx: number) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{summary.book.title}</td>
                <td className="p-2">{summary.book.isbn}</td>
                <td className="p-2">{summary.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
