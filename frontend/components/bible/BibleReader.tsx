import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Verse = {
  verse_number: number;
  text: string;
};

type BibleContent = {
  book: string;
  chapter: number;
  verses: Verse[];
};

const fetchBibleContent = async (book: string, chapter: number): Promise<BibleContent> => {
  const response = await axios.get(`http://localhost:8000/bible?book=${book}&chapter=${chapter}`);
  return response.data;
};

export default function BibleReader() {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["bibleContent", book, chapter],
    () => fetchBibleContent(book, chapter),
    { keepPreviousData: true }
  );

  const handleNextChapter = () => setChapter((prev) => prev + 1);
  const handlePreviousChapter = () => setChapter((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    setChapter(1); // Reset chapter when book changes
  }, [book]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <select
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="border rounded-md p-2"
        >
          {[
            "Genesis",
            "Exodus",
            "Leviticus",
            "Numbers",
            "Deuteronomy",
            "Joshua",
            "Judges",
            "Ruth",
            "1 Samuel",
            "2 Samuel",
            "1 Kings",
            "2 Kings",
            "1 Chronicles",
            "2 Chronicles",
            "Ezra",
            "Nehemiah",
            "Esther",
            "Job",
            "Psalms",
            "Proverbs",
            "Ecclesiastes",
            "Song of Solomon",
            "Isaiah",
            "Jeremiah",
            "Lamentations",
            "Ezekiel",
            "Daniel",
            "Hosea",
            "Joel",
            "Amos",
            "Obadiah",
            "Jonah",
            "Micah",
            "Nahum",
            "Habakkuk",
            "Zephaniah",
            "Haggai",
            "Zechariah",
            "Malachi",
            "Matthew",
            "Mark",
            "Luke",
            "John",
            "Acts",
            "Romans",
            "1 Corinthians",
            "2 Corinthians",
            "Galatians",
            "Ephesians",
            "Philippians",
            "Colossians",
            "1 Thessalonians",
            "2 Thessalonians",
            "1 Timothy",
            "2 Timothy",
            "Titus",
            "Philemon",
            "Hebrews",
            "James",
            "1 Peter",
            "2 Peter",
            "1 John",
            "2 John",
            "3 John",
            "Jude",
            "Revelation",
          ].map((bookName) => (
            <option key={bookName} value={bookName}>
              {bookName}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreviousChapter} disabled={chapter === 1}>
            Previous Chapter
          </Button>
          <Button variant="outline" onClick={handleNextChapter}>
            Next Chapter
          </Button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading Bible content.</p>}
      {data && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {data.book} Chapter {data.chapter}
          </h2>
          <div className="space-y-2">
            {data.verses.map((verse) => (
              <p key={verse.verse_number}>
                <span className="font-bold">{verse.verse_number}</span> {verse.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
