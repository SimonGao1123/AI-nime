import express from 'express';
import { db } from '../database';
import {Request, Response} from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { AnimeData } from '../../definitions/animeDataTypes';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const router = express.Router();


router.post("/search", async (req: Request<{},{},{query: string, page: number, limit: number, genres: string, type: string}>, res: Response<{success: boolean, animeData: AnimeData[] | null, animeCount: number}>) => {
    // Genres needs to look like: "Adventure,Comedy,Fantasy"
    
    const {query, page, limit, genres, type} = req.body;
    if (!page || !limit) {
        return res.status(401).json({success: false, animeData: null, animeCount: 0});
    }
    // normal search (title)
    const pageNum = Math.max(Number(page) || 1, 1); // min on page #1
    const limitNum = Math.min(Number(limit) || 20, 40); // at most 40 on one page 
    const offset = (pageNum - 1) * limitNum;
    
    try {
        const animeData = await db.query(
            `
            SELECT * FROM anime_data 
            WHERE (name ILIKE $1 OR english_name ILIKE $1)
            AND genres @> ARRAY (
                SELECT trim(g)
                FROM unnest(string_to_array($2, ',')) AS g
            ) AND type = $3
            LIMIT $4
            OFFSET $5
            `
            , [`%${query}%`, genres, type, limit, offset]
        );

        const countResult = await db.query(
            `
            SELECT COUNT(*) 
            FROM anime_data
            WHERE name ILIKE $1 OR english_name ILIKE $1
            `,
            [`%${query}%`]
        );

        const totalCount = Number(countResult.rows[0].count);
        return res.status(200).json({success: true, animeData: animeData.rows, animeCount: totalCount});        
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, animeData: null, animeCount: 0});
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