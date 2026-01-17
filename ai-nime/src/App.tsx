import { useEffect, useState } from 'react'
import style from './App.module.css'
import SearchBarComponent from './lib/Searchbar.tsx'
import type { AnimeData } from '../definitions/animeDataTypes.ts';
import {getAnimeData} from './lib/data/searchBarQuery.ts'

function App() {
    const [totalAnimeCount, setTotalAnimeCount] = useState<number>(0);
    const [animeData, setAnimeData] = useState<AnimeData[]>([]);
    
    const [pageNum, setPageNum] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(20);
    
    useEffect(
        () => {
            getAnimeData("", pageNum, limitPerPage, setTotalAnimeCount, setAnimeData);
        }, []    
    );

    console.log(animeData);
    return (
        <SearchBarComponent 
            setTotalAnimeCount={setTotalAnimeCount}
            setAnimeData={setAnimeData}
            page={pageNum}
            limit={limitPerPage}
        />
        
    );
}

export default App
