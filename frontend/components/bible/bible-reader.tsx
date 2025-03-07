import React, { useState } from "react";

interface BibleReaderProps {
  initialBook?: string;
  initialChapter?: number;
}

const books = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Psalms", chapters: 150 },
  { name: "Matthew", chapters: 28 },
  { name: "John", chapters: 21 },
];

export default function BibleReader({
  initialBook = "Genesis",
  initialChapter = 1,
}: BibleReaderProps) {
  const [selectedBook, setSelectedBook] = useState(initialBook);
  const [selectedChapter, setSelectedChapter] = useState(initialChapter);

  const handleBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bookName = event.target.value;
    setSelectedBook(bookName);
    setSelectedChapter(1); // Reset to chapter 1 when book changes
  };

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChapter(Number(event.target.value));
  };

  const currentBook = books.find((book) => book.name === selectedBook);

  return (
    <div className="p-4 bg-background text-foreground rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Bible Reader</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="book-select" className="block text-sm font-medium mb-2">
            Select Book:
          </label>
          <select
            id="book-select"
            value={selectedBook}
            onChange={handleBookChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          >
            {books.map((book) => (
              <option key={book.name} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="chapter-select" className="block text-sm font-medium mb-2">
            Select Chapter:
          </label>
          <select
            id="chapter-select"
            value={selectedChapter}
            onChange={handleChapterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          >
            {currentBook &&
              Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(
                (chapter) => (
                  <option key={chapter} value={chapter}>
                    Chapter {chapter}
                  </option>
                )
              )}
          </select>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">
          {selectedBook} - Chapter {selectedChapter}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Content for {selectedBook} Chapter {selectedChapter} will be displayed here.
        </p>
      </div>
    </div>
  );
}
