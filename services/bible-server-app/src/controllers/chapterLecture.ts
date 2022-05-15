import { Response, Request } from "express";
import { bookParser, chapterParser } from "../services";
import { ChapterResearch } from "../models";

export async function getEntireChapter(req: Request, res: Response): Promise<void> {
  const {book, chapter} = req.body.data;
  if (!book || !chapter) {
    res.status(400).send({
      message: "bad chapter/book value",
    })
    return;
  }

  const parsedChapter = await chapterParser(chapter)
  const parsedBook = await bookParser(book)
  if (parsedChapter === null || parsedBook === null) {
    res.status(400).send({
      message: "bad chapter/book value",
    })
    return;
  }
  
  const chapterResearch = new ChapterResearch(parsedBook, parsedChapter);
  const result = await chapterResearch.getChapterResult()
  res.json({ data: result })
}