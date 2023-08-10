import React, { FC } from 'react';
import data from '../books.json';
import type { Book } from './libs/types';
import dynamic from 'next/dynamic';
import IndexLoading from './loading';
// import IndexClientPage from './client';
const IndexClientPage = dynamic(() => import('./client'), {
  ssr: false,
  loading: IndexLoading
});
// const books: Book[] = data.library.map((data) => data.book);

async function IndexPage() {
  const books: Book[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        import('../books.json').then((data) =>
          data.library.map((data) => data.book)
        )
      );
    }, 1000);
  });
  const genres: string[] = Array.from(new Set(books.map((book) => book.genre)));

  return <IndexClientPage books={books} genres={genres} />;
}

export default IndexPage;
