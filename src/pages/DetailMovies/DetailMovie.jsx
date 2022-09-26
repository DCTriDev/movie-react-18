import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'

import { ButtonPrimary, ButtonSecondary, ButtonSubmit } from '@components/button/ButtonCustom'
import Transaction from '@components/transaction/Transaction'
import localServices from '@services/local.service'
import ItemActor from './ItemActor/ItemActor'
import movieService from '@api/movieAPI'

function DetailMovie() {
  const { id } = useParams()
  const history = useHistory()
  
  const [detailMovies, setDetailMovies] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    !detailMovies && movieService.getDetailMovie(id)
      .then(res => {
        console.log(res.data.getDetailMovie)
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

  const handleRenderActor = (actor) => {
    return actor?.map((item, index) => {
      return <ItemActor key={index} actor={item} />
    })
  }

  const handleShowTransaction = () => {
    setVisible(true)
  }

  const handleRenderNavigationBtn = () => {
    const isLogin = Boolean(localServices.getAccessToken())
    if (!isLogin) {
      return (
        <>
          <p className='text-center text-xl text-text-color-secondary'>You're not login yet.<br />Please Login Or Sign
            Up Now!</p>
          <div className='space-x-4'>
            <ButtonSubmit onClick={() => history.push('/login')}>Login</ButtonSubmit>
            <ButtonSecondary onClick={() => history.push('/sign-up')}>Sign Up</ButtonSecondary>
          </div>
        </>
      )
    } else if (detailMovies?.isPurchased) {
      return (
        <>
          <p className='text-center lg:text-xl md:text-[16px] text-[14px] text-text-color-secondary'>You're owned this
            content.<br />Click bellow button to watch!</p>
          <ButtonPrimary onClick={() => {
            history.push(`${process.env.REACT_APP_LINK_WATCH}/${detailMovies?.id}`)
          }}>Watch Now</ButtonPrimary>
        </>
      )
    } else {
      return (
        <>
          <p className='text-center lg:text-lg md:text-[15px] text-[13px] text-text-color-secondary'>You're not owned
            this content.<br />Click bellow button to buy!</p>
          <ButtonPrimary onClick={handleShowTransaction}>Buy Now</ButtonPrimary>
        </>
      )
    }
  }

  return (
    <div className='w-full min-h-screen'>
      <div className='grid grid-cols-8 py-5 lg:max-w-[1280px] mx-auto max-w-[95vw] lg:h-[600px]'>
        <div
          className='lg:col-span-6 col-span-8 flex flex-col items-center justify-center lg:h-full md:h-[500px] h-[300px]'>
          <ReactPlayer controls={true} pip={true} url={detailMovies?.trailer} width='100%' height='100%' />
        </div>
        <div className='lg:col-span-2 col-span-8 bg-black p-4 lg:h-full h-max-content'>
          <div className='flex flex-col justify-between h-full items-center'>
            <div>
              <h3 className='text-xl text-text-color-title font-bold'>{detailMovies?.title}</h3>
            </div>
            {
              handleRenderNavigationBtn()
            }
          </div>
        </div>
        <Transaction detailMovie={detailMovies} handleShowTransaction={handleShowTransaction} visible={visible}
                     setVisible={setVisible} />
      </div>
      <div className='lg:max-w-[850px] max-w-[80vw] mx-auto text-text-color-description py-4'>
        <h3 className='text-xl text-text-color-title font-bold'>{detailMovies?.title}</h3>
        <p
          className='px-2 py-0.5 bg-amber-500 rounded-xl text-black font-bold leading-10 inline'>{detailMovies?.type}</p>
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

export default DetailMovie
