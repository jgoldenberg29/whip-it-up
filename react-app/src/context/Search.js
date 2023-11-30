import React, { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

export const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext)

export function SearchProvider({ children }) {
    const [searchResults, setSearchResults] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [noSearchResults, setSearchNoResults] = useState('')

    const contextValue = {
      searchResults,
      setSearchResults,
      showSearch,
      setShowSearch,
      noSearchResults,
      setSearchNoResults
    };

    return (
      <>
        <SearchContext.Provider value={contextValue}>
          {children}
        </SearchContext.Provider>
      </>
    );
  }
