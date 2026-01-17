import { useState } from "react";
import styles from "./PerCard.module.css";
import type { AnimeData, SearchBarProps } from "../../definitions/animeDataTypes";
import {getAnimeData} from './data/searchBarQuery';

type Anime = {
    name: string;
    english_name: string;
    imageUrl: string;

};

export function PerCardComponent({name, imageUrl, english_name}: Anime) {
  return (
    <div className={styles.PerCard}>
        <img src={imageUrl} alt={name} className={styles.image} />
        <h3 className={styles.name}>{name}</h3>
        <h3 className={styles.name}>{english_name}</h3>
    </div>
  );
}

export function FullCardList({animeData}: {animeData: AnimeData[]}) {
    return (
        <div className={styles.cardList}>
            {animeData.map((each_anime: AnimeData) => (
                <PerCardComponent 
                    english_name={each_anime.english_name}
                    name={each_anime.name}
                    imageUrl={each_anime.image_url}
                />
                
            ))}
        </div>
    )
}

