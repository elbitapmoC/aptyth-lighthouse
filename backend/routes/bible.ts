import { Router } from "oak";
import db from "@/db/postgres.ts";

const router = new Router();

/**
 * Fetches Bible content based on the provided book and chapter.
 */
router.get("/bible", async (ctx) => {
  try {
    const book = ctx.request.url.searchParams.get("book");
    const chapter = ctx.request.url.searchParams.get("chapter");

    if (!book || !chapter) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Missing required query parameters: book and chapter",
      };
      return;
    }

    const chapterNumber = Number.parseInt(chapter, 10);
    if (isNaN(chapterNumber) || chapterNumber <= 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Invalid chapter number. It must be a positive integer.",
      };
      return;
    }

    const queryText = `
      SELECT verse_number, text
      FROM bible_content
      WHERE book = $1 AND chapter = $2
      ORDER BY verse_number
    `;
    const verses = await db.query(queryText, [book, chapterNumber]);

    if (verses.rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "No content found for the specified book and chapter.",
      };
      return;
    }

    ctx.response.body = {
      book,
      chapter: chapterNumber,
      verses: verses.rows,
    };
  } catch (error) {
    console.error("Error fetching Bible content:", error);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "An error occurred while fetching Bible content.",
    };
  }
});

export default router;