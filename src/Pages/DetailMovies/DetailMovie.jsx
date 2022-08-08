import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {useParams} from 'react-router-dom'
import movieService from '../../API/movieAPI'
import moment from 'moment'
import {ButtonCustom} from '../../Components/ButtonCustom/ButtonCustom'
import ItemActor from './ItemActor/ItemActor'

const {ButtonSecondary} = ButtonCustom

const actor = [
    {
        id: 1,
        name: 'Denise Richards',
        image: 'https://m.media-amazon.com/images/M/MV5BMTQyNjYxNDU5OV5BMl5BanBnXkFtZTcwNTY5NDQwOA@@._V1_UX214_CR0,0,214,317_AL_.jpg',
    },
    {
        id: 2,
        name: 'Dolph Lundgren',
        image: "https://m.media-amazon.com/images/M/MV5BMTUyMzEyNzU4NV5BMl5BanBnXkFtZTgwNDg2MzM3MDE@._V1_UX214_CR0,0,214,317_AL_.jpg"
    },
]

function DetailMovie() {
    const {id} = useParams()
    const [detailMovies, setDetailMovies] = useState(null)
    useEffect(() => {
        !detailMovies && movieService.getDetailMovie(id)
            .then(res => {
                setDetailMovies(res.data.getDetailMovie)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleRenderCategory = (category) => {
        const categoryLength = category?.length
        return category?.map((item, index) => {
            if (index === categoryLength - 1) {
                return <span key={index}>{item.categoryName}</span>
            }
            return <span key={index}>{item.categoryName} · </span>
        })
    }

    console.log(detailMovies)

    return (<div className='w-full px-12'>
        <div className='grid grid-cols-8 py-5 lg:max-w-[1200px] mx-auto'>
            <div className='col-span-5 flex flex-col items-center justify-center h-[625px]'>
                <ReactPlayer controls={true} pip={true} url={detailMovies?.trailer} width='100%' height='100%' />
            </div>
            <div className='col-span-3 bg-black pl-4'>
                <h3 className='text-xl text-text-color-title font-bold py-4'>{detailMovies?.title}</h3>
                {detailMovies?.isPurchased ? <ButtonSecondary>Watch Now</ButtonSecondary> :
                    <button>Purchase Now</button>}
            </div>
        </div>
        <div className='max-w-[850px] mx-auto text-text-color-description py-4'>
            <h3 className='text-xl text-text-color-title font-bold'>{detailMovies?.title}</h3>
            <p className='px-2 py-0.5 bg-amber-500 rounded-xl text-black font-bold leading-10 inline'>{detailMovies?.type}</p>
            <div className='leading-3'>
                <p>Director: {detailMovies?.director}</p>
                <p>Release Date: {moment(new Date(+detailMovies?.releaseDate)).format('DD/MM/YYYY')}</p>
                <p>Category: {handleRenderCategory(detailMovies?.category)}</p>
                <p className='mt-2 leading-5'>{detailMovies?.description}</p>
            </div>
            <h3 className='text-xl text-text-color-title font-bold mt-3'>Actor</h3>
            <div className='grid grid-cols-4 gap-4'>
                {
                    actor.map((item, index) => {
                        return <ItemActor key={index} actor={item} />
                    })
                }
            </div>
        </div>
    </div>)
}

export default DetailMovie;
