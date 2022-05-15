import { searchBibleFullChapter } from "../services"

export class ChapterResearch {

  book: number;

  chapter: number

  constructor(book: number, chapter: number) {
    this.book = book;
    this.chapter = chapter;
  }

  public async getChapterResult() {
    const result = await searchBibleFullChapter(this.book, this.chapter);
    return result;
  }
}