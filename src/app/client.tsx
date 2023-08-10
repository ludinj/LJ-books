'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { onReadListChange } from './libs/helpers';
import type { Book } from './libs/types';

export default function IndexClientPage({
  books,
  genres
}: {
  books: Book[];
  genres: Book['genre'][];
}) {
  const [genre, setGenre] = useState<Book['genre']>('');
  const [readList, setReadList] = useState<Book['ISBN'][]>([]);

  const matches = useMemo(() => {
    return genre
      ? books.filter((book) => {
          if (book.genre !== genre) return false;
          return true;
        })
      : books;
  }, [genre, books]);

  function handleBookClick(book: Book['ISBN']) {
    const draft = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book];
    setReadList(draft);
    localStorage.setItem('readList', JSON.stringify(draft));
  }

  useEffect(() => {
    const unSubscribe = onReadListChange(setReadList);
    return () => unSubscribe();
  }, []);

  return (
    <article className='grid gap-4'>
      <nav>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className='cursor-pointer'
        >
          <option value=''>Todos</option>
          {genres.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 '>
        {matches.map((book) => (
          <li
            key={book.ISBN}
            className='grid gap-2 bg-neutral-800 rounded-md overflow-clip'
            onClick={() => handleBookClick(book.ISBN)}
          >
            <img
              src={book.cover}
              alt={book.title}
              className='aspect-[9/14] object-cover w-full'
            />
            <p className='p-2'>
              {book.title}
              {readList.includes(book.ISBN) && <span> 🌟</span>}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
