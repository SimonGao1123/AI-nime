import { useState } from "react";
import type { FilterGenresProps } from "../../definitions/animeDataTypes";
import style from './Filters.module.css';

const allGenres = [
  "Slice of Life",
  "Fantasy",
  "Award Winning",
  "Adventure",
  "Avant Garde",
  "Romance",
  "UNKNOWN",
  "Action",
  "Suspense",
  "Gourmet",
  "Sports",
  "Drama",
  "Boys Love",
  "Ecchi",
  "Mystery",
  "Girls Love",
  "Supernatural",
  "Comedy",
  "Sci-Fi",
  "Horror",
  "Erotica"
];

const allTypes = [
  "TV",
  "Special",
  "ONA",
  "Music",
  "Movie",
  "OVA"
];
export default function FilterGenres ({setTotalAnimeCount, setAnimeData, page, limit, genreFilter, typeFilter, setGenreFilter, setTypeFilter, text}: FilterGenresProps) {
    const [showFilters, setShowFilters] = useState(false);
    
    // filter genres / types
    const filterBtns = [];

    for (let i = 0; i < allGenres.length; i++) {
        filterBtns.push(
            <div key={`genre-filter-${i}`} className={style.filterItem}>
                <input id={`filter-btns-${i}`} 
                name="genres-filter" 
                value={allGenres[i]} 
                checked={genreFilter.includes(allGenres[i])}
                onChange={() => {
                    let newFilter;
                    if (genreFilter.includes(allGenres[i])) {
                        newFilter = genreFilter.filter(genre => genre !== allGenres[i]);
                    } else {
                        newFilter = [...genreFilter, allGenres[i]];
                    }
                    setGenreFilter(newFilter);
                }}
                type="checkbox"
                />
                <label htmlFor={`filter-btns-${i}`}>{allGenres[i]}</label>
            </div>
        );
    }
    const typeBtns = [];
    for (let i = 0; i < allTypes.length; i++) {
        typeBtns.push(
            <div key={`type-filter-${i}`} className={style.filterItem}>
                <input id={`filter-type-btns-${i}`} 
                name="types-filter" 
                value={allTypes[i]} 
                checked={typeFilter === allTypes[i]}
                onChange={() => {
                    if (typeFilter === allTypes[i]) {
                        setTypeFilter("");
                    } else {
                        setTypeFilter(allTypes[i]);
                    }
                }}
                type="checkbox"
                />
                <label htmlFor={`filter-type-btns-${i}`}>{allTypes[i]}</label>
            </div>
        );
    }

    return (
        <>
            <button className={style.toggleBtn} onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
            </button>
            {showFilters && (
                <div className={style.filterContainer}>
                    <div className={style.filterSection}>
                        <h3>Filter Genres</h3>
                        <div className={style.filterGroup}>
                            {filterBtns}
                        </div>
                    </div>

                    <div className={style.filterSection}>
                        <h3>Filter Types</h3>
                        <div className={style.filterGroup}>
                            {typeBtns}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}