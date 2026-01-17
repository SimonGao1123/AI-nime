import express from 'express';
import { db } from '../database';
import {Request, Response} from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const router = express.Router();

// const model = genAI.getGenerativeModel({model: "gemma-3-4b-it"}); 
// const result = await model.generateContent(prompt);
// const text = result.response.text();


export default router;