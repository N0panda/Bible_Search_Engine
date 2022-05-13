import {USER_INPUT_MAX_LENGTH, USER_INPUT_MIN_LENGTH} from "../config";

export async function userInputParser(str: string): Promise<string | null> {
  const inputFormated = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ ]{2,}/g, " ")
  if (str.length < USER_INPUT_MIN_LENGTH || str.length > USER_INPUT_MAX_LENGTH) return null;
  return inputFormated;
}
