import { useEffect, useState } from 'react'
import style from './App.module.css'
import SearchBarComponent from './lib/Searchbar.tsx'
import type { AnimeData } from '../definitions/animeDataTypes.ts';
import {getAnimeData} from './lib/data/searchBarQuery.ts'
import {LimitBtn, PageBtns} from './lib/Buttons.tsx'

import { FullCardList } from './lib/PerCard.tsx';
function App() {
    const [totalAnimeCount, setTotalAnimeCount] = useState<number>(0);
    const [animeData, setAnimeData] = useState<AnimeData[]>([]);
    
    const [pageNum, setPageNum] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(20);
    
    useEffect(
        () => {
            getAnimeData("", pageNum, limitPerPage, setTotalAnimeCount, setAnimeData);
        }, [limitPerPage, pageNum]    
    );

    console.log(animeData);
    return (
        <main>
            <SearchBarComponent 
                setTotalAnimeCount={setTotalAnimeCount}
                setAnimeData={setAnimeData}
                page={pageNum}
                limit={limitPerPage}
            />

            <span style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <PageBtns
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalAnimeCount={totalAnimeCount}
            limitPerPage={limitPerPage}
            />
            <LimitBtn
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            />
            </span>
        
        
        <FullCardList
        animeData={animeData}/>
        </main>
    
        

    );
}

export default App
