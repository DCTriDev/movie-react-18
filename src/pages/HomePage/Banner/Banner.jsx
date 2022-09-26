import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Carousel } from 'antd'

function Banner() {
  const history = useHistory()
  const [listMovieBanner, setListMovieBanner] = useState(null)

  const fetchBannerData = () => {

  }

  useEffect(() => {
    fetchBannerData()
  }, [])

  const renderBannerItem = () => {
    if (listMovieBanner) {
      return listMovieBanner.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.hinhAnh} alt='' className='w-full h-auto cursor-pointer'
                 onClick={() => {
                   history.push(`${process.env.REACT_APP_LINK_DETAIL_MOVIE}/${item.maPhim}`)
                 }}
            />
          </div>
        )
      })
    }
  }

  return (
    <Carousel
      autoplay={true}
      dots={false}
    >
      {renderBannerItem()}
    </Carousel>
  )
}

export default React.memo(Banner)
