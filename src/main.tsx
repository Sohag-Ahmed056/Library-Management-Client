import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App';
import AllBooks from './pages/AllBooks';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import BookDetails from './pages/BookDetails';
import BorrowBook from './pages/BorrowBook';
import BorrowSummary from './pages/BorrowSummary';
import { Provider } from 'react-redux';
import { store } from './app/store';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <AllBooks /> },
      { path: 'books', element: <AllBooks /> },
      { path: 'create-book', element: <CreateBook /> },
      { path: 'books/:id', element: <BookDetails /> },
      { path: 'edit-book/:id', element: <EditBook /> },
      { path: 'borrow/:bookId', element: <BorrowBook /> },
      { path: 'borrow', element: <BorrowSummary /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
