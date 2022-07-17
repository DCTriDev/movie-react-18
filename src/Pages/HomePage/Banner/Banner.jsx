import React, {useEffect, useState} from 'react';
import {Carousel} from 'antd';
import movieService from "../../../API/movieAPI";
import {useHistory} from "react-router-dom";

function Banner() {
    const history = useHistory();
    const [listMovieBanner, setListMovieBanner] = useState(null);

    useEffect(() => {
        movieService.getListBanner()
            .then(res => {
                setListMovieBanner(res.data.content);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const renderBannerItem = () => {
        if (listMovieBanner) {
            return listMovieBanner.map((item, index) => {
                return (
                    <div key={index}>
                        <img src={item.hinhAnh} alt="" className='w-full h-auto cursor-pointer'
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
    );
}

export default React.memo(Banner);
