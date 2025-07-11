import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow border-b bg-white">
      <Link to="/books" className="text-xl font-bold text-indigo-600">📚 My Library</Link>
      <div className="flex gap-4">
        <NavLink to="/books">
          <Button variant="ghost">All Books</Button>
        </NavLink>
        <NavLink to="/create-book">
          <Button variant="ghost">Add Book</Button>
        </NavLink>
        <NavLink to="/borrow">
          <Button variant="ghost">Borrow Summary</Button>
        </NavLink>
      </div>
    </nav>
  );
}
