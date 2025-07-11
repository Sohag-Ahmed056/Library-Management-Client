import type { Book } from "@/features/books/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  initial?: Partial<Book>;
  onSubmit: (data: Partial<Book>) => void;
  submitText: string;
};

export default function BookForm({ initial = {}, onSubmit, submitText }: Props) {
  const [form, setForm] = useState<Partial<Book>>(initial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Partial<Book> = {
      ...form,
      available: form.copies !== undefined ? form.copies > 0 : true,
    };

    onSubmit(payload);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Title"
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <Input
        placeholder="Author"
        value={form.author || ""}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        required
      />
      <Input
        placeholder="Genre"
        value={form.genre || ""}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
        required
      />
      <Input
        placeholder="ISBN"
        value={form.isbn || ""}
        onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        required
      />
      <Textarea
        placeholder="Description"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Copies"
        value={form.copies ?? ""}
        onChange={(e) => setForm({ ...form, copies: +e.target.value })}
        required
      />
      <Button type="submit">{submitText}</Button>
    </form>
  );
}
