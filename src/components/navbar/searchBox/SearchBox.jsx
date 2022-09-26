import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchListMovie } from '@redux/slice/movieSlice'
import SearchBoxOutline from './SearchBoxOutline'

function SearchBox() {
  const listMovie = useSelector((state) => state.movieSlice.listMovie)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchTerm.length > 0) {
        return setSearchResults(null)
      }
      const result = listMovie.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(result)
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
    !listMovie && dispatch(fetchListMovie())
  }, [listMovie])

  if (searchResults) return (
    <div className='relative'>
      <SearchBoxOutline
        placeholder='End game'
        className='lg:max-w-3xl md:max-w-xl sm:max-w-56 rounded-2xl bg-background-search text-white border-none'
        onChange={handleSearch}
        suffix={<ion-icon name='search-outline' />}
      />
    </div>
  )

  return (
    <div className='relative'>
      <SearchBoxOutline
        placeholder='End game'
        className='lg:max-w-3xl md:max-w-xl sm:max-w-56 rounded-2xl bg-background-search text-white border-none'
        onChange={handleSearch}
        suffix={<ion-icon name='search-outline' />}
      />
    </div>
  )
}

export default SearchBox
