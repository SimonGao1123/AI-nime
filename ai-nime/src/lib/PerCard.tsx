import { useState } from "react";
import styles from "./PerCard.module.css";
import type { AnimeData, SearchBarProps } from "../../definitions/animeDataTypes";
import {getAnimeData} from './data/searchBarQuery';



export function PerCardComponent({animeData, setSelectedAnime}: { animeData: AnimeData, setSelectedAnime: any }) {
  return (
    <div onClick={() => setSelectedAnime(animeData)} className={styles.PerCard}>
        <img src={animeData.image_url} alt={animeData.name} className={styles.image} loading="lazy"/>
        <h3 className={styles.name}>{animeData.name}</h3>
        <h3 className={styles.name}>{animeData.english_name}</h3>
    </div>
  );
}

export function FullCardList({animeData, setSelectedAnime}: {animeData: AnimeData[], setSelectedAnime: any}) {
    return (
        <div className={styles.cardList}>
            {animeData.map((each_anime: AnimeData) => (
                <PerCardComponent 
                    key={each_anime.anime_id}
                    animeData={each_anime}
                    setSelectedAnime={setSelectedAnime}
                />
                
            ))}
        </div>
    )
}

