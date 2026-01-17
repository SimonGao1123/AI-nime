export type AnimeData = {
    anime_id: number,
    name: string,
    english_name: string,
    genres: string[],
    summary: string,
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
    limit: number
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