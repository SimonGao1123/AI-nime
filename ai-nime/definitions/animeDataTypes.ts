export type AnimeData = {
    anime_id: number,
    name: string,
    english_name: string,
    genres: string[],
    synopsis: string,
    type: string,
    premiered: string,
    studios: string,
    duration: string,
    image_url: string,

}

export type SearchBarProps = {
    setTotalAnimeCount: React.Dispatch<React.SetStateAction<number>>, 
    setAnimeData: React.Dispatch<React.SetStateAction<AnimeData[]>>
    page: number,
    limit: number,
    genreFilter: string[],
    typeFilter: string,
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}
export type LimitBtnProps = {
    limitPerPage: number,
    setLimitPerPage: React.Dispatch<React.SetStateAction<number>>
}
export type PageBtnsProps = {
    pageNum: number,
    setPageNum: React.Dispatch<React.SetStateAction<number>>
    totalAnimeCount: number,
    limitPerPage:number
}
export type FilterGenresProps = {
    setTotalAnimeCount: React.Dispatch<React.SetStateAction<number>>, 
    setAnimeData: React.Dispatch<React.SetStateAction<AnimeData[]>>
    page: number,
    limit: number,
    genreFilter: string[],
    typeFilter: string,
    setGenreFilter: React.Dispatch<React.SetStateAction<string[]>>,
    setTypeFilter: React.Dispatch<React.SetStateAction<string>>,
    text: string

}

export type AnimeDetailsProps = {
    selectedAnime: AnimeData | null, 
    setSelectedAnime: React.Dispatch<React.SetStateAction<AnimeData | null>>
}

export type SearchBarAIProps = {
    page: number, 
    limit: number, 
    setAnimeData: React.Dispatch<React.SetStateAction<AnimeData[]>>, 
    setTotalAnimeCount: React.Dispatch<React.SetStateAction<number>>
}