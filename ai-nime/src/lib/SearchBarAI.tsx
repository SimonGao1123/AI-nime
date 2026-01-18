import { useState } from "react";
import type { SearchBarAIProps } from "../../definitions/animeDataTypes";
import {getAnimeDataAI} from "../lib/data/searchBarQuery"
import styles from "./SearchBarAI.module.css";

export default function SearchBarAI ({page, limit, setAnimeData, setTotalAnimeCount} : SearchBarAIProps) {
    const [text, setText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        if (text.trim()) {
            setIsLoading(true);
            getAnimeDataAI(text, page, limit, setTotalAnimeCount, setAnimeData, setIsLoading);
        }
    };

    return (
        <>
            <div className={styles.searchBar}>
                <textarea
                className={styles.input}
                placeholder="Search with AI..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isLoading}
                />
                <button 
                className={styles.searchBtn}
                onClick={handleSearch}
                disabled={isLoading || !text.trim()}
                >
                    Search
                </button>
            </div>

            {isLoading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingContent}>
                        <div className={styles.spinner}></div>
                        <p className={styles.loadingText}>AI is analyzing your request...</p>
                    </div>
                </div>
            )}
        </>
    );
}