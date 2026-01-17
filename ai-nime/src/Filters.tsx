import { useEffect, useState } from 'react'
import type { FilterGenresProps } from "../definitions/animeDataTypes";
import style from './lib/Filters.module.css';
import { getAnimeData } from './lib/data/searchBarQuery';

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
  "UNKNOWN",
  "Music",
  "Movie",
  "OVA"
];
export default function FilterGenres ({setTotalAnimeCount, setAnimeData, page, limit, genreFilter, typeFilter, setGenreFilter, setTypeFilter, text}: FilterGenresProps) {
    // filter genres / types
    const filterBtns = [];

    for (let i = 0; i < allGenres.length; i++) {
        filterBtns.push(
            <div key={`genre-filter-${i}`}>
                <label htmlFor={`filter-btns-${i}`}>{allGenres[i]}</label>
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
            </div>
        );
    }
    const typeBtns = [];
    for (let i = 0; i < allTypes.length; i++) {
        typeBtns.push(
            <div key={`type-filter-${i}`}>
                <label htmlFor={`filter-type-btns-${i}`}>{allTypes[i]}</label>
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
                type="radio"
                />

            </div>
        );
    }

    return (
        <>
            <div>
                <h3>Filter Genres</h3>
                {filterBtns}
            </div>

            <div>
                <h3>FIlter Types</h3>
                {typeBtns}
            </div>

            <button onClick={() => {
                getAnimeData(text, page, limit, setTotalAnimeCount, setAnimeData, genreFilter, typeFilter);
            }}>Apply Filter</button>
        </>
    );

}