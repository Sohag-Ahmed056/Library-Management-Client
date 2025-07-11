import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from './types';


interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}




export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://library-management-api-eosin.vercel.app/api/',
  }),
  tagTypes: ['Books', 'Borrow'],
  endpoints: (builder) => ({
   
    getBooks: builder.query<Book[], void>({
      query: () => 'books',
      transformResponse: (response: ApiResponse<Book[]>) => response.data,
      providesTags: ['Books'],
    }),

   
    getBook: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      transformResponse: (response: ApiResponse<Book>) => response.data,
      providesTags: ['Books'],
    }),

    // 3. Create a book
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: 'books',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<Book>) => response.data,
      invalidatesTags: ['Books'],
    }),

    // 4. Update a book
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: ApiResponse<Book>) => response.data,
      invalidatesTags: ['Books'],
    }),

    // 5. Delete a book
    deleteBook: builder.mutation<void, string>({
  query: (id) => ({
    url: `books/${id}`,
    method: 'DELETE',
  }),
 
  invalidatesTags: ['Books'],
}),


    // 6. Borrow a book
    borrowBook: builder.mutation<any, { book: string; quantity: number; dueDate: string }>({
  query: (body) => ({
    url: 'borrow', 
    method: 'POST',
    body,          
  }),
  invalidatesTags: ['Books', 'Borrow'],
}),


    // 7. Borrowed Books Summary
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => 'borrow',
      transformResponse: (response: ApiResponse<BorrowSummary[]>) => response.data,
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
