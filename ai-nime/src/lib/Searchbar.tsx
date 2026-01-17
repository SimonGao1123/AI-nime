import { useState } from "react";
import styles from "./Searchbar.module.css";

type Anime = {
  animeId: string;
  name: string;
}

function SearchBarComponent({}) {
    const [text, setText] = useState("");
    // const [searched, setSearched] = useState("");
    
    /*
    function handleSearch(){
        setSearched(text);
    }
    */

  return (
    <div className={styles.searchBar}>
      <input 
      type="text" 
      placeholder="Search..." 
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
        <button>Search</button>
    </div>
  );
}

export default SearchBarComponent;