import type { Book } from './types';

export function onReadListChange(callback: (readList: Book['ISBN'][]) => void) {
  function getReadList() {
    const readList = JSON.parse(
      localStorage.getItem('readList') ?? '[]'
    ) as Book['ISBN'][];
    callback(readList);
  }

  window.addEventListener('storage', getReadList);
  getReadList();

  return () => window.removeEventListener('storage', getReadList);
}
