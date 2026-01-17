import express from 'express';
import {Request, Response} from 'express';
import cors from 'cors';

// ROUTER IMPORTS:
import animeQueries from './routers/animeQueries';

import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/getAnime", animeQueries);

app.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});