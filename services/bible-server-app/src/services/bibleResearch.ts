import { matchUserQueryInDatabase } from "../adapters";
import { BIBLE_INDEX_NAME } from "../config";
import { BibleInterface } from "../interfaces"

export async function searchBibleVerse(userQuery: string): Promise<Array<BibleInterface>> {
  const result = await matchUserQueryInDatabase(userQuery, BIBLE_INDEX_NAME);
  return result;
}