import express from 'express';
import { db } from '../database';
import {Request, Response} from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { AnimeData } from '../../definitions/animeDataTypes';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const router = express.Router();


router.get("/search/:query/:page/:limit", async (req: Request<{query: string, page: number, limit: number}>, res: Response<{success: boolean, animeData: AnimeData[] | null}>) => {
    const {query, page, limit} = req.params;
    // normal search (title)
    const pageNum = Math.max(Number(page) || 1, 1); // min on page #1
    const limitNum = Math.min(Number(limit) || 20, 40); // at most 40 on one page 
    const offset = (pageNum - 1) * limitNum;
    
    try {
        const animeData = await db.query(
            `
            SELECT * FROM anime_data 
            WHERE name ILIKE $1
            LIMIT $2
            OFFSET $3
            `
            , [`%${query}%`, limit, offset]
        );

        return res.status(200).json({success: true, animeData: animeData.rows});        
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, animeData: null});
    }
});

router.post("/AIsearch", async (req: Request<{},{},{query: string}>, res: Response<any>) => {
    const {query} = req.body;
    try {
        const model = genAI.getGenerativeModel({model: "gemma-3-4b-it"}); 
        // TODO :edit prompt
        const prompt = `${query}`;
        
        const result = await model.generateContent(prompt);

        // TODO: parse then query database and return list of animes
        const text = result.response.text();

        return res.status(201).json({test: text});

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, animeData: null});
    }
    
});


export default router;