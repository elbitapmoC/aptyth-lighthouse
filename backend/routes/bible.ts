import { Hono } from 'hono';

const bible = new Hono();

// Sample Bible data
const bibleData = {
  genesis: {
    1: {
      1: 'In the beginning God created the heavens and the earth.',
      2: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
    },
    2: {
      1: 'Thus the heavens and the earth were completed in all their vast array.',
      2: 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.',
    },
  },
};

// Route to fetch a specific verse
bible.get('/:book/:chapter/:verse', (c) => {
  const { book, chapter, verse } = c.req.param();
  const chapterData = bibleData[book]?.[chapter];
  const verseText = chapterData?.[verse];

  if (!verseText) {
    return c.json(
      {
        error: 'Verse not found. Please check the book, chapter, and verse.',
      },
      404
    );
  }

  return c.json({
    book,
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10),
    text: verseText,
  });
});

// Route to fetch all verses in a chapter
bible.get('/:book/:chapter', (c) => {
  const { book, chapter } = c.req.param();
  const chapterData = bibleData[book]?.[chapter];

  if (!chapterData) {
    return c.json(
      {
        error: 'Chapter not found. Please check the book and chapter.',
      },
      404
    );
  }

  return c.json({
    book,
    chapter: parseInt(chapter, 10),
    verses: chapterData,
  });
});

export default bible;
