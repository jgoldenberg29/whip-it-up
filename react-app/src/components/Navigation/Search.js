import { useEffect, useRef, useState } from "react"



export default function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)
    const searchRef = useRef()

    useEffect(() => {
        if (!searchFocus) return;

        const closeMenu = (e) => {
          if (!searchRef.current.contains(e.target)) {
            searchFocus(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    return (
        <>
            <form>
                <input
                ref={searchRef}
                className="form-input search-input"
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder={`${<i className="fa-solid fa-magnifying-glass"></i>} Find a recipe...`}
                onClick={() => setSearchFocus(true)}
                />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </>
    )
}
