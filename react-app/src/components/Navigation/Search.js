import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useSearch } from "../../context/Search"

export default function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)
    const searchRef = useRef()
    const recipes = useSelector(state => state.recipes)
    const {
        searchResults,
        setSearchResults,
        showSearch,
        setShowSearch,
        noSearchResults,
        setNoSearchResults
    } = useSearch()

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

      const handleSubmit = e => {
        e.preventDefault()
        const localSearchResults = []
        Object.values(recipes).forEach(recipe => {
            const title = recipe.title.toLowerCase()
            if (title.includes(searchInput.toLowerCase())) {
                localSearchResults.push(recipe)
            }
        })
        console.log(localSearchResults)
        if (localSearchResults.length) {
            setSearchResults([...localSearchResults])
            setShowSearch(true)
            setNoSearchResults(false)
        } else {
            setNoSearchResults(true)
        }


    }

      console.log("searchResults", searchResults)
      const searchButtonClass = searchFocus ? 'search-button' : 'search-button-hidden'

    return (
        <>
            <form
            className="search-form"
            onSubmit={handleSubmit}
            >
                <input
                    ref={searchRef}
                    className="search-input"
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder= " Discover new recipes..."
                    onClick={() => setSearchFocus(true)}
                />
                <button
                    // ref={searchRef}
                    className={searchButtonClass}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </>
    )
}
