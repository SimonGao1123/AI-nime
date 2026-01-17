import { useState } from "react";
import styles from "./Searchbar.module.css";
import type { SearchBarProps } from "../../definitions/animeDataTypes";
import {getAnimeData} from './data/searchBarQuery';

function SearchBarComponent({page, limit, setTotalAnimeCount, setAnimeData} : SearchBarProps) {
    const [text, setText] = useState<string>("");
    

  return (
    <div className={styles.searchBar}>
      <input 
      type="text" 
      placeholder="Search..." 
      value={text}
      onChange={(e) => {
        setText(e.target.value)
        getAnimeData(text, page, limit, setTotalAnimeCount, setAnimeData);
      }}
      />
        <button>Search</button>
    </div>
  );
}

export default SearchBarComponent;