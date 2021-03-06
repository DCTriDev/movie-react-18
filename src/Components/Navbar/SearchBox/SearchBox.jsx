import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import PopUpSearch from "./PopUpSearch";
import SearchBoxOutline from "./SearchBoxOutline"

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const listMovie = useSelector(state => state.movieSlice.listMovie)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.length > 0) {
                const result = listMovie.filter(item => {
                    return item.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
                })
                setSearchResults(result)
            } else {
                setSearchResults(null)
            }
        }, 400)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className='relative'>
            <SearchBoxOutline
                placeholder='End game'
                className='lg:max-w-3xl md:max-w-xl sm:max-w-56 rounded-2xl bg-background-search text-white border-none'
                onChange={handleSearch}
                suffix={<ion-icon name="search-outline"/>}
            >

            </SearchBoxOutline>
            {
                searchResults
                    ?
                    <PopUpSearch searchResults={searchResults}/>
                    :
                    <></>
            }
        </div>
    );
}

export default SearchBox;
