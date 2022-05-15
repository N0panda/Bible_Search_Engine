import express from "express";
import { searchInBook, getEntireChapter } from "../controllers";

const router = express.Router();

router.post("/bible/search/searchInBible", searchInBook);
router.post("/bible/search/searchAllVerses", getEntireChapter);

export default router;