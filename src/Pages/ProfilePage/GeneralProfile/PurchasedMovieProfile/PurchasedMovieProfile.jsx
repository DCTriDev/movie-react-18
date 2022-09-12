import React from 'react'
import ItemMovie from '../../../HomePage/ListMovies/ItemMovie'

function PurchasedMovieProfile(props) {
    const {userInfo} = props

    const handleRenderPurchasedMovie = () => {
        if (userInfo.purchasedMovie.length > 0) {
            return userInfo.purchasedMovie?.map((item, key) => {
                return (
                    <ItemMovie data={item} key={key} />
                )
            })
        } else return <div className='text-center col-span-6'>No movie found!</div>
    }

    return (
        <div className='grid grid-cols-6 bg-black rounded-2xl p-6 space-x-3 space-y-3'>
            <div className='col-span-6'>
                <h2 className='text-text-color-secondary'>Purchased Movie</h2>
            </div>
            {
                handleRenderPurchasedMovie()
            }
        </div>
    )
}

export default PurchasedMovieProfile
