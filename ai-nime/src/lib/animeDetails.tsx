import { useState } from "react";
import type { AnimeDetailsProps } from "../../definitions/animeDataTypes";
import style from "./animeDetails.module.css";
export default function AnimeDetails ({selectedAnime, setSelectedAnime} : AnimeDetailsProps) {
    
    const genreString = selectedAnime?.genres.join(", ");
    
    
    return (
        <div className={style.detail_container}>
            <button onClick={() => setSelectedAnime(null)}className={style.escape}>←</button>
            <div className={style.left_column}>
                <img src={selectedAnime?.image_url} alt={selectedAnime?.name} className={style.image} loading="lazy"/>
                <h2 className={style.name}>{selectedAnime?.name}</h2>
                <h2 className={style.eng_name}>{selectedAnime?.english_name}</h2>
                <h3 className={style.genres}>Genres: {genreString}</h3>
                <h3 className={style.type}>Type: {selectedAnime?.type}</h3>
            </div>
            <div className={style.right_column}>
                <p className={style.summary}>
                    {selectedAnime?.synopsis || "No summary available"}
                </p>

                <p>Premiered on: {selectedAnime?.premiered}</p>
                <p>Studio: {selectedAnime?.studios}</p>
                <p>Duration: {selectedAnime?.duration}</p>
            </div>
        </div>
    );
}