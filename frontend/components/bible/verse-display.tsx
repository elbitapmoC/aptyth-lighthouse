import React from "react";

interface VerseDisplayProps {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function VerseDisplay({
  book,
  chapter,
  verse,
  text,
}: VerseDisplayProps) {
  return (
    <div className="p-4 bg-background text-foreground border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-2">
        {book} {chapter}:{verse}
      </h2>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}
