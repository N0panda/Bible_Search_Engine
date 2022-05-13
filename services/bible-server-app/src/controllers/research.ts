import { Response, Request } from "express";
import { userInputParser } from "../services";
import { UserResearch } from "../models";

export async function searchInBook(req: Request, res: Response): Promise<void> {
  const userInput = req.body.data;
  if (!userInput) {
    res.status(400).send({
      message: "no user input",
    })
    return;
  }

  const parsedInput = await userInputParser(userInput)
  if (!parsedInput) {
    res.status(400).send({
      message: "no user input",
    })
    return;
  }
  
  const userResearch = new UserResearch(parsedInput);
  const result = await userResearch.getUserResult()

  res.json({ data: result })
}