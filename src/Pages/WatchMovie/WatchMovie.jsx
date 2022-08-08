import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {useHistory, useParams} from 'react-router-dom'
import movieService from '../../API/movieAPI'
import {ButtonCustom} from '../../Components/ButtonCustom/ButtonCustom'
import moment from 'moment/moment'

const {ButtonSquare, ButtonPrimary} = ButtonCustom

function WatchMovie(props) {
    const {id} = useParams()
    const history = useHistory()
    const [detailMovies, setDetailMovies] = useState(null)
    const [source, setSource] = useState(null)
    const [url, setUrl] = useState(null)

    const handleRenderListSourceBtn = (source) => {
        return source?.map((item, index) => {
            return (
                <ButtonSquare key={index} onClick={() => {

                }}>
                    {item.detailSource}
                </ButtonSquare>
            )

        })
    }

    useEffect(() => {
        !detailMovies && movieService.getSourceMovie(id)
            .then(res => {
                console.log(res)
                setDetailMovies(res.data.getSourceMovie)
                setSource(res.data.getSourceMovie.movieSource)
                setUrl(res.data.getSourceMovie.movieSource[0].source)
            })
            .catch(err => {
                console.log(err)
            })
    })
    console.log(source)
    console.log(url)

    return (
        <div className='w-full px-12'>
            <div className='grid grid-cols-8 py-5 lg:max-w-[1280px] mx-auto h-[600px]'>
                <div className='col-span-5 flex flex-col items-center justify-center h-full '>
                    <ReactPlayer controls={true} pip={true} url={url} width='100%' height='100%' />
                </div>
                <div className='col-span-3 bg-black p-4 h-full'>
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
            <div className='max-w-[850px] mx-auto text-text-color-description py-4'>
                <h3 className='text-xl text-text-color-title font-bold'>{detailMovies?.title}</h3>
                <p className='px-2 py-0.5 bg-amber-500 rounded-xl text-black font-bold leading-10 inline'>{detailMovies?.type}</p>
                <div className='leading-3'>
                    <p>Director: {detailMovies?.director}</p>
                    <p>Release Date: {moment(new Date(+detailMovies?.releaseDate)).format('DD/MM/YYYY')}</p>
                    {/*<p>Category: {handleRenderCategory(detailMovies?.category)}</p>*/}
                    <p className='mt-2 leading-5'>{detailMovies?.description}</p>
                </div>
                {/*<h3 className='text-xl text-text-color-title font-bold mt-3'>Actor</h3>*/}
                {/*<div className='grid grid-cols-4 gap-4'>*/}
                {/*    {*/}
                {/*        // handleRenderActor(detailMovies?.actor)*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default WatchMovie
