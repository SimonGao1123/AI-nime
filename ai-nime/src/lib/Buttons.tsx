import { useState } from "react";
import style from './Buttons.module.css';
import type { LimitBtnProps, PageBtnsProps } from "../../definitions/animeDataTypes";

export function LimitBtn ({limitPerPage, setLimitPerPage} : LimitBtnProps) {

    return (
        <select 
        value={limitPerPage} 
        onChange={(e) => setLimitPerPage(Number(e.target.value))}
        className={`${style.limitSelect} ${style.pageBtn}`}
        >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
        </select>
    );
}

export function PageBtns ({pageNum, setPageNum, totalAnimeCount, limitPerPage}: PageBtnsProps) {
    const totalNumberPages = Math.ceil(totalAnimeCount/limitPerPage);

    return (
        <>
            <button className={style.pageBtn} disabled={pageNum<=1} onClick={() => { 
                if (pageNum - 1 > 0) {
                    setPageNum(pageNum-1)
                }
            }}>←</button> 

            <Pagination pageNum={pageNum} setPageNum={setPageNum} totalNumberPages={totalNumberPages}/>

            <button className={style.pageBtn} disabled={pageNum>=totalNumberPages} onClick={() => {
                if (pageNum + 1 <= totalNumberPages) {
                    setPageNum(pageNum+1)
                }
            }}>→</button> : <></>
        </>
    );
}
function Pagination ({pageNum, setPageNum, totalNumberPages} : {pageNum: number, setPageNum: React.Dispatch<React.SetStateAction<number>>, totalNumberPages: number}) {
    const [manualPageDisplay, setManual] = useState<boolean>(false);
    const pageButtons = [];
    for (let i = pageNum-2; i <= pageNum+2; i++) {
        if (i < 1 || i > totalNumberPages) {
            continue; // skip button
        }
        pageButtons.push(
            <button key={i} className={i !== pageNum ? style.pageBtn : `${style.pageBtn} ${style.activeBtn}`} onClick={() => setPageNum(i)}>
                {i}
            </button>
        );
    }

    return (
    <>
        {!manualPageDisplay ? (
        <>
            {pageNum > 3 ? (
            <button className={style.pageBtn} onClick={() => setPageNum(1)}>1</button>
            ) : null}

            {pageNum > 4 ? (
            <button className={style.pageBtn} onClick={() => setManual(true)}>...</button>
            ) : null}

            {pageButtons}

            {pageNum < totalNumberPages - 3 ? (
            <button className={style.pageBtn} onClick={() => setManual(true)}>...</button>
            ) : null}

            {pageNum <= totalNumberPages - 3 ? (
            <button className={style.pageBtn} onClick={() => setPageNum(totalNumberPages)}>
                {totalNumberPages}
            </button>
            ) : null}
        </>
        ) : (
        <ManualPageInput
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalNumberPages={totalNumberPages}
            setManual={setManual}
        />
        )}
    </>
    );
}
function ManualPageInput ({pageNum, setPageNum, totalNumberPages, setManual} :
    {pageNum: number, setPageNum: React.Dispatch<React.SetStateAction<number>>, totalNumberPages: number, setManual: React.Dispatch<React.SetStateAction<boolean>>}
) {
    const [inputValue, setInputValue] = useState(pageNum.toString());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const num = Number(inputValue);
        if (!isNaN(num) && num >= 1 && num <= totalNumberPages) {
            setPageNum(num);
        }
        setManual(false);

    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
            <input
                type="number"
                min={1}
                max={totalNumberPages}
                value={inputValue}
                onChange={handleInputChange}
                style={{ width: '60px' }}
            />
            <button type="submit">Go</button>
        </form>
    );
}