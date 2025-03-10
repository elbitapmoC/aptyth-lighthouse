import { Router } from "https://deno.land/x/oak/mod.ts";
import db from "../db/mod.ts";

const router = new Router();

/**
 * Fetches all Bible books.
 */
router.get("/bible/books", async (ctx) => {
  try {
    const queryText = "SELECT id, name, testament FROM bible_books ORDER BY id";
    const result = await db.query(queryText);

    ctx.response.status = 200;
    ctx.response.body = result.rows;
  } catch (error) {
    console.error("Error fetching Bible books:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to fetch Bible books." };
  }
});

/**
 * Fetches chapters for a specific Bible book.
 */
router.get("/bible/books/:bookId/chapters", async (ctx) => {
  try {
    const bookId = ctx.params.bookId;

    if (!bookId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Book ID is required." };
      return;
    }

    const queryText =
      "SELECT chapter_number FROM bible_chapters WHERE book_id = $1 ORDER BY chapter_number";
    const result = await db.query(queryText, [bookId]);

    ctx.response.status = 200;
    ctx.response.body = result.rows;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to fetch chapters." };
  }
});

/**
 * Fetches verses for a specific chapter in a Bible book.
 */
router.get("/bible/books/:bookId/chapters/:chapterNumber/verses", async (ctx) => {
  try {
    const { bookId, chapterNumber } = ctx.params;

    if (!bookId || !chapterNumber) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Book ID and chapter number are required." };
      return;
    }

    const queryText =
      "SELECT verse_number, text FROM bible_verses WHERE book_id = $1 AND chapter_number = $2 ORDER BY verse_number";
    const result = await db.query(queryText, [bookId, chapterNumber]);

    ctx.response.status = 200;
    ctx.response.body = result.rows;
  } catch (error) {
    console.error("Error fetching verses:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to fetch verses." };
  }
});

export default router;
