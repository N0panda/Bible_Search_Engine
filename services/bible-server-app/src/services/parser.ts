import { isNumberObject } from "util/types";
import {
  USER_INPUT_MAX_LENGTH,
  USER_INPUT_MIN_LENGTH,
  BOOK_MAX,
  BOOK_MIN,
  CHAPTER_MAX,
  CHAPTER_MIN,
} from "../config";

export async function userInputParser(str: string): Promise<string | null> {
  const inputFormated = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ ]{2,}/g, " ");
  if (str.length < USER_INPUT_MIN_LENGTH || str.length > USER_INPUT_MAX_LENGTH)
    return null;
  return inputFormated;
}

async function formatNumber(str: string) {
  return str.replace(/[^0-9]+/g, "");
}

export async function bookParser(book: number): Promise<number | null> {
  const formatedBook = Number(await formatNumber(String(book)))
  if (
    formatedBook === null ||
    formatedBook === undefined ||
    formatedBook < BOOK_MIN ||
    formatedBook > BOOK_MAX
  )
    return null;
  return formatedBook;
}

export async function chapterParser(chapter: number): Promise<number | null> {
  const formatedChapter = Number(await formatNumber(String(chapter)))
  if (
    formatedChapter === null ||
    formatedChapter === undefined ||
    formatedChapter < CHAPTER_MIN ||
    formatedChapter > CHAPTER_MAX
  )
    return null;
  return formatedChapter;
}
