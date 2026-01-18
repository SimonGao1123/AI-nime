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
            ) AND (NOT EXISTS (
                SELECT 1 FROM anime_data WHERE type=$5 
            ) OR type=$5) 
            LIMIT $3
            OFFSET $4
            `
            , [`%${query}%`, genres, limit, offset, type]
        );

        const countResult = await db.query(
            `
            SELECT COUNT(*) 
            FROM anime_data
            WHERE (name ILIKE $1 OR english_name ILIKE $1)
            AND genres @> ARRAY (
                SELECT trim(g)
                FROM unnest(string_to_array($2, ',')) AS g
            ) AND (NOT EXISTS (
                SELECT 1 FROM anime_data WHERE type=$3 
            ) OR type=$3) 

            `,
            [`%${query}%`, genres, type]
        );

        const totalCount = Number(countResult.rows[0].count);
        return res.status(200).json({success: true, animeData: animeData.rows, animeCount: totalCount});        
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, animeData: null, animeCount: 0});
    }
});

router.post("/AIsearch", async (req: Request<{},{},{query: string, page: number, limit: number}>, res: Response<any>) => {
    const {query, page, limit} = req.body;
    try {
        // Get all anime IDs and names from the database
        const animeList = await db.query(
            `SELECT anime_id, name FROM anime_data ORDER BY name`
        );

        // Create array of anime objects
        const animeDict = animeList.rows;

        // Create a map for quick title lookup (case-insensitive)
        const titleToIdMap = new Map(
            animeDict.map(anime => [anime.name.toLowerCase(), anime.anime_id])
        );

        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

        const prompt = `Based on the user's query, recommend 5 anime titles that best match the description. 
        Use the official titles as listed on MyAnimeList.
        Return ONLY a JSON array of the 5 titles as strings. Do not include any other text.
        Example format: \`\`\`json["Cowboy Bebop", "Samurai Champloo", "Steins;Gate", "Death Note", "Attack on Titan"]\`\`\`
        
        User query: ${query}`;
        
        let validatedIds: number[] = [];
        let attempts = 0;
        const maxAttempts = 5;

        // Try to get 10 valid IDs by making multiple requests
        while (validatedIds.length < 10 && attempts < maxAttempts) {
            attempts++;
            
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            
            // Add this line to see the AI's raw response
            console.log(`Attempt ${attempts} - AI Response:`, text);

            try {
                // Try to parse the response
                const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
                const parsedTitles = JSON.parse(cleanText);

                // Validate that we got an array of strings
                if (Array.isArray(parsedTitles) && parsedTitles.every(t => typeof t === 'string')) {
                    // Find IDs for titles that exist in our database
                    const newIds = parsedTitles
                        .map(title => titleToIdMap.get(title.toLowerCase()))
                        .filter(id => id !== undefined && !validatedIds.includes(id)) as number[];
                    
                    const matchedTitles = parsedTitles.filter(title => 
                    titleToIdMap.has(title.toLowerCase()) && 
                    !validatedIds.includes(titleToIdMap.get(title.toLowerCase())!)
                    );
                    console.log(`Matched titles:`, matchedTitles);
                    // Add new valid IDs to our list
                    validatedIds.push(...newIds);
                    
                    console.log(`Found ${newIds.length} valid titles. Total so far: ${validatedIds.length}`);
                }

                

            } catch (parseError) {
                console.log(`Attempt ${attempts}: Could not parse AI response`, text);
            }
        }



        // If we got at least some valid IDs, return them (up to 10)
        if (validatedIds.length > 0) {
            const pageNum = Math.max(Number(page) || 1, 1);
            const limitNum = Math.min(Number(limit) || 20, 40);
            const offset = (pageNum-1)*limitNum;
            const retrivedData = await db.query(
                `SELECT * FROM anime_data WHERE anime_id=ANY($1::int[])
                 LIMIT $2 OFFSET $3`,
                [validatedIds, limitNum, offset]
            );
            
            return res.status(201).json({
                success: true,
                animeData: retrivedData.rows, 
                animeCount: validatedIds.length
                // attempts: attempts,
                // totalFound: validatedIds.length
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "AI found no valid anime titles in database",
                attempts: attempts
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, animeData: null});
    }
    
});


export default router;