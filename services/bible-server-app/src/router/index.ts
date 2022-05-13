import express from "express";
import { searchInBook } from "../controllers";

const router = express.Router();

router.post("/bible/search/searchInBible", searchInBook);

export default router;