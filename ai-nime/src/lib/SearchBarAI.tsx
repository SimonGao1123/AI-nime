import type { SearchBarAIProps } from "../../definitions/animeDataTypes";
import {getAnimeDataAI} from "../lib/data/searchBarQuery"
import styles from "./SearchBarAI.module.css";
export default function SearchBarAI ({text, setText, page, limit, setAnimeData, setTotalAnimeCount} : SearchBarAIProps) {
    return (
    <div className={styles.searchBar}>
      <input 
      className={styles.input}
      type="text" 
      placeholder="Search..." 
      value={text}
      onChange={(e) => {
        setText(e.target.value)
        getAnimeDataAI(e.target.value, page, limit, setTotalAnimeCount, setAnimeData);
      }}
      />
    </div>
  );
}