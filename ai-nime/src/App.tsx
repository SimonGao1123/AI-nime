import { useEffect, useState } from 'react'
import style from './App.module.css'
import SearchBarComponent from './lib/Searchbar.tsx'
import type { AnimeData } from '../definitions/animeDataTypes.ts';
import {getAnimeData} from './lib/data/searchBarQuery.ts'
import {LimitBtn, PageBtns} from './lib/Buttons.tsx'
import FilterGenres from './lib/Filters.tsx';
import { FullCardList } from './lib/PerCard.tsx';
import AnimeDetails from './lib/animeDetails.tsx';
import SearchBarAI from './lib/SearchBarAI.tsx';
function App() {
    const [promptAI, setPromptAI] = useState<boolean>(false);

    const [totalAnimeCount, setTotalAnimeCount] = useState<number>(0);
    const [animeData, setAnimeData] = useState<AnimeData[]>([]);
    
    const [pageNum, setPageNum] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(20);
    
    const [genreFilter, setGenreFilter] = useState<string[]>([]);
    const [typeFilter, setTypeFilter] = useState<string>("");

    const [text, setText] = useState<string>("");

    const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);
    useEffect(
        () => {
            getAnimeData(text, pageNum, limitPerPage, setTotalAnimeCount, setAnimeData, genreFilter, typeFilter);
        }, [limitPerPage, pageNum, genreFilter, typeFilter, text]    
    );
    useEffect(
        () => {
            setPageNum(1);
            getAnimeData(text, 1, limitPerPage, setTotalAnimeCount, setAnimeData, genreFilter, typeFilter);

        }, [text, genreFilter, typeFilter]
    )


    return (
        <main>
            <h1 className={style.title}>AI-nime</h1>
            
            { !selectedAnime ? 
            <>
            
            {
            !promptAI?
            <SearchBarComponent 
                setTotalAnimeCount={setTotalAnimeCount}
                setAnimeData={setAnimeData}
                page={pageNum}
                limit={limitPerPage}
                genreFilter={genreFilter}
                typeFilter={typeFilter}
                text={text}
                setText={setText}
            />
            : 
            <SearchBarAI
            page={pageNum}
            limit={limitPerPage}
            setAnimeData={setAnimeData}
            setTotalAnimeCount={setTotalAnimeCount}
            />
            }   
            <div className={style.btn_container}>
                <button className={promptAI ? style.AI_btn : `${style.AI_btn} ${style.selected_btn}`} onClick={() => setPromptAI(false)}>
                    Normal Search 🔍</button>
                <button className={!promptAI ? style.AI_btn : `${style.AI_btn} ${style.selected_btn}`} onClick={() => setPromptAI(true)}>
                    AI Search
                </button>
            </div>
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
            
            {
            promptAI ? <></> :
            <FilterGenres 
            setTotalAnimeCount={setTotalAnimeCount}
            setAnimeData={setAnimeData}
            page={pageNum}
            limit={limitPerPage}
            genreFilter={genreFilter}
            typeFilter={typeFilter}
            setGenreFilter={setGenreFilter}
            setTypeFilter={setTypeFilter}
            text={text}/>
            }
        
        
            <FullCardList
            animeData={animeData}
            setSelectedAnime={setSelectedAnime}
            />
            </>
            : 
            <AnimeDetails
            selectedAnime={selectedAnime}
            setSelectedAnime={setSelectedAnime}/>
            }
        </main>
    
        

    );
}

export default App
