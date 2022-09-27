import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useDebounce from '@hooks/useDebounce'
import { fetchListMovie } from '@redux/slice/movieSlice'
import SearchBoxOutline from './SearchBoxOutline'
import PopUpSearch from '@components/navbar/searchBox/PopUpSearch'

function SearchBox() {
  const listMovie = useSelector((state) => state.movieSlice.listMovie)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const debounceValue = useDebounce(searchTerm)

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  //Debounce Search
  useEffect(() => {
    if (debounceValue.length > 0) {
      const result = listMovie.filter((item) => {
        return item.title.toLowerCase().includes(debounceValue.toLowerCase())
      })
      setSearchResults(result)
    } else {
      setSearchResults(null)
    }
  }, [debounceValue])

  useEffect(() => {
    !listMovie && dispatch(fetchListMovie())
  }, [listMovie])

  if (searchResults) return (
    <div className='relative'>
      <SearchBoxOutline
        placeholder='End game'
        className='lg:max-w-3xl md:max-w-xl sm:max-w-56 rounded-2xl bg-background-search text-white border-none'
        onChange={handleChange}
        suffix={<ion-icon name='search-outline' />}
      />
      <PopUpSearch searchResults={searchResults} setSearchTerm={setSearchTerm} />
    </div>
  )

  return (
    <div className='relative'>
      <SearchBoxOutline
        placeholder='End game'
        className='lg:max-w-3xl md:max-w-xl sm:max-w-56 rounded-2xl bg-background-search text-white border-none'
        onChange={handleChange}
        suffix={<ion-icon name='search-outline' />}
      />
    </div>
  )
}

export default SearchBox
