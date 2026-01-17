export function getAnimeData (query: string, page: number, limit: number, 
    setTotalAnimeCount: any, setAnimeData: any) {
    fetch("http://localhost:3000/getAnime/search", {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json; charset=UTF-8' // Set the content type header
        },
        body: JSON.stringify({query, page, limit})
    }).then(async res => {
        const parsed = await res.json();
        if (parsed.success) {
            setAnimeData(parsed.animeData);
        }
        setTotalAnimeCount(parsed.animeCount);
    }).catch(err => {
        console.log(err);
    })
}

