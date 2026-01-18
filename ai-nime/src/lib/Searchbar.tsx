import { useState } from "react";
import styles from "./Searchbar.module.css";
import type { SearchBarProps } from "../../definitions/animeDataTypes";
import {getAnimeData} from './data/searchBarQuery';

function SearchBarComponent({page, limit, setTotalAnimeCount, setAnimeData, genreFilter, typeFilter, text, setText} : SearchBarProps) {
    

  return (
    <div className={styles.searchBar}>
      <input 
      className={styles.input}
      type="text" 
      placeholder="Search..." 
      value={text}
      onChange={(e) => {
        setText(e.target.value)
      }}
      />
      <button onClick={() => getAnimeData(text, page, limit, setTotalAnimeCount, setAnimeData, genreFilter, typeFilter)}>Search</button>
    </div>
  );
}

export default SearchBarComponent;