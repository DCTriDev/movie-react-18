import React from 'react'
import ItemMovie from '@pages/HomePage/ListMovies/ItemMovie'

function PurchasedMovieProfile(props) {
  const { userInfo } = props

  const handleRenderPurchasedMovie = () => {
    if (userInfo.purchasedMovie.length > 0) {
      return userInfo.purchasedMovie?.map((item, key) => {
        return (
          <ItemMovie className='col-span-1' data={item} key={key} />
        )
      })
    } else return <div className='text-center col-span-6'>No movie found!</div>
  }

  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 bg-black rounded-2xl p-6 space-x-3 space-y-3'>
      <div className='lg:col-span-6 md:col-span-4 col-span-2'>
        <h2 className='text-text-color-secondary'>Purchased Movie</h2>
      </div>
      {
        handleRenderPurchasedMovie()
      }
    </div>
  )
}

export default PurchasedMovieProfile
