import { useEffect, useRef, useState } from "react"

export default function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)
    const searchRef = useRef()

    useEffect(() => {
        if (!searchFocus) return;

        const unfocus = (e) => {
          if (!searchRef.current.contains(e.target)) {
            setSearchFocus(false);
          }
        };

        document.addEventListener("click", unfocus);

        return () => document.removeEventListener("click", unfocus);
      }, [searchFocus]);

      const searchButtonClass = searchFocus ? 'search-button' : 'search-button-hidden'

    return (
        <>
            <form className="search-form">
                <input
                ref={searchRef}
                className="search-input"
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder={`${<i className="fa-solid fa-magnifying-glass"></i>} Find a recipe...`}
                onClick={() => setSearchFocus(true)}
                />
                <button className={searchButtonClass}><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </>
    )
}
