import React, {useEffect, useState} from 'react';
import moment from "moment";
import ReactPlayer from "react-player";
import {useParams} from "react-router-dom";
import movieService from "../../API/movieAPI";

function DetailMovie() {
    const {maPhim} = useParams()
    const [detailMovies, setDetailMovies] = useState(null)
    console.log(detailMovies, "detailMovies")
    useEffect(() => {
        movieService.getMovieDetail(maPhim)
            .then((res) => {
                console.log(res, "response")
                setDetailMovies(res.data.content)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        detailMovies ? <div className='w-full bg-gradient-to-b from-sky-900 to-indigo-800 py-20 px-12'>
            <div className='w-full grid grid-cols-8 gap-3'>
                <div className='col-span-3 self-center h-full'>
                    <img className='w-full h-3/4 object-cover rounded-lg' src={detailMovies.hinhAnh} alt="..."/>
                </div>
                <div className='col-span-5 px-4'>
                    <h2 className='text-center text-3xl uppercase text-cyan-500 font-bold py-4'>{detailMovies.tenPhim}</h2>
                    <p className='text-lg text-gray-300'>{detailMovies.moTa}</p>
                    <p className='text-right italic text-amber-300 mr-16'>Đánh giá: {detailMovies.danhGia}/10</p>
                    <div className=''>
                        {
                            detailMovies.dangChieu ? (
                                <div className='flex flex-col items-center'>
                                    <p className='py-6 text-lg text-white italic'>Ngày công
                                        chiếu: {moment(detailMovies.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                                    <button
                                        className='bg-green-600 hover:bg-green-700 rounded-lg px-3 py-2 text-lg text-gray-50 transition-all duration-300'>Mua
                                        Vé
                                    </button>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center'>
                                    <p className='py-6 text-lg text-white italic'>Ngày công
                                        chiếu: {moment(detailMovies.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                                    <button
                                        className='bg-green-600 hover:bg-green-700 rounded-lg px-3 py-2 text-lg text-gray-50 transition-all duration-300'>Đăng
                                        Ký Nhận Tin
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                detailMovies.trailer ? (
                    <div className='w-full flex flex-col items-center justify-center p-20 space-y-6'>
                        <h3 className='text-white text-2xl'>Trailer</h3>
                        <ReactPlayer url={detailMovies.trailer} width="850px" height='480px'/>
                    </div>
                ) : (<></>)
            }
        </div> : <></>
    );
}

export default DetailMovie;
