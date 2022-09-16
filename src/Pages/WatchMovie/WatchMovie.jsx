import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {useHistory, useParams} from 'react-router-dom'
import movieService from '../../API/movieAPI'
import {ButtonCustom} from '../../Components/ButtonCustom/ButtonCustom'
import moment from 'moment/moment'
import ItemActor from '../DetailMovies/ItemActor/ItemActor'

const {ButtonSquare} = ButtonCustom

function WatchMovie(props) {
    const {id} = useParams()
    const history = useHistory()
    const [detailMovies, setDetailMovies] = useState(null)
    const [source, setSource] = useState([])
    const [url, setUrl] = useState(null)

    const handleRenderListSourceBtn = (source) => {
        if(source.length > 0) {
            return source?.map((item, index) => {
                return (
                    <ButtonSquare key={index} onClick={() => {
                        setUrl(item.source)
                    }}>
                        {item.detailSource}
                    </ButtonSquare>
                )

            })
        }else {
            return <>No source found!</>
        }
    }

    const handleErrorWithSource = (res) => {
        if(res.data.errors){
            setTimeout(() => {
                history.push(`/detail-movie/${id}`)
            },3000)
        }
    }

    const handleRenderCategory = (category) => {
        const categoryLength = category?.length
        return category?.map((item, index) => {
            if (index === categoryLength - 1) {
                return <span key={index}>{item.categoryName}</span>
            }
            return <span key={index}>{item.categoryName} · </span>
        })
    }

    const handleRenderActor = (actor) => {
        return actor?.map((item, index) => {
            return <ItemActor key={index} actor={item} />
        })
    }

    useEffect(() => {
        !detailMovies && movieService.getSourceMovie(id)
            .then(res => {
                handleErrorWithSource(res)
                setDetailMovies(res.data.getSourceMovie)
                setSource(res.data.getSourceMovie.movieSource)
                setUrl(res.data.getSourceMovie.movieSource[0].source)
            })
            .catch(err => {
                console.log(err)
            })
    })
    return (
        <div className='w-full min-h-screen'>
            <div className='grid grid-cols-8 py-5 lg:max-w-[1280px] mx-auto max-w-[95vw] lg:h-[600px]'>
                <div className='lg:col-span-6 col-span-8 flex flex-col items-center justify-center lg:h-full md:h-[500px] h-[300px]'>
                    {
                        source.length >0
                            ?
                            <ReactPlayer controls={true} pip={true} url={url} width='100%' height='100%' />
                            :
                            <div className='bg-black w-full h-full flex flex-col justify-center items-center'>
                                <p>No data found!</p>
                                <p>Please try again later!</p>
                            </div>
                    }
                </div>
                <div className='lg:col-span-2 col-span-8 bg-black p-4 lg:h-full h-max-content'>
                    <div className='flex flex-col h-full items-center'>
                        <div className='mb-5'>
                            <h3 className='text-xl text-text-color-title font-bold'>{detailMovies?.title}</h3>
                        </div>
                        {
                            handleRenderListSourceBtn(source)
                        }
                    </div>
                </div>
            </div>
            <div className='lg:max-w-[850px] max-w-[80vw] mx-auto text-text-color-description py-4'>
                <h3 className='text-xl text-text-color-title font-bold'>{detailMovies?.title}</h3>
                <p className='px-2 py-0.5 bg-amber-500 rounded-xl text-black font-bold leading-10 inline'>{detailMovies?.type}</p>
                <div className='leading-3 lg:text-[14px] md:text-[13px] text-[12px]'>
                    <p>Director: {detailMovies?.director}</p>
                    <p>Release Date: {moment(new Date(+detailMovies?.releaseDate)).format('DD/MM/YYYY')}</p>
                    <p>Category: {handleRenderCategory(detailMovies?.category)}</p>
                    <p className='mt-2 leading-5'>{detailMovies?.description}</p>
                </div>
                <h3 className='text-xl text-text-color-title font-bold mt-3'>Actor</h3>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-3 lg:gap-4 gap-3'>
                    {
                        handleRenderActor(detailMovies?.actor)
                    }
                </div>
            </div>
        </div>
    )
}

export default WatchMovie
