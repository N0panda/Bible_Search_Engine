import { matchUserQueryInDatabase, getFullChapterInDatabase } from "../adapters";
import { BIBLE_INDEX_NAME } from "../config";
import { BibleInterface } from "../interfaces"

export async function searchBibleVerse(userQuery: string): Promise<Array<BibleInterface>> {
  const result = await matchUserQueryInDatabase(userQuery, BIBLE_INDEX_NAME);
  return result;
}

export async function searchBibleFullChapter(book: number, chapter: number): Promise<Array<BibleInterface>> {
  const result = await getFullChapterInDatabase(book, chapter, BIBLE_INDEX_NAME);
  return result;
}