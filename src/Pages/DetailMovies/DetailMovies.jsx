import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import moment from "moment";
import ReactPlayer from "react-player";

function DetailMovies({maPhim}) {
    const dispatch = useDispatch()
    let detailsMovies = null

    useEffect(() => {

    }, []);

    return (
        detailsMovies? <div className='w-full bg-gradient-to-b from-sky-900 to-indigo-800 py-20 px-12'>
            <div className='w-full grid grid-cols-8 gap-3'>
                <div className='col-span-3 self-center h-full'>
                    <img className='w-full h-3/4 object-cover rounded-lg' src={detailsMovies.hinhAnh} alt="..."/>
                </div>
                <div className='col-span-5 px-4'>
                    <h2 className='text-center text-3xl uppercase text-cyan-500 font-bold py-4'>{detailsMovies.tenPhim}</h2>
                    <p className='text-lg text-gray-300'>{detailsMovies.moTa}</p>
                    <p className='text-right italic text-amber-300 mr-16'>Đánh giá: {detailsMovies.danhGia}/10</p>
                    <div className=''>
                        {
                            detailsMovies.dangChieu ? (
                                <div className='flex flex-col items-center'>
                                    <p className='py-6 text-lg text-white italic'>Ngày công
                                        chiếu: {moment(detailsMovies.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                                    <button
                                        className='bg-green-600 hover:bg-green-700 rounded-lg px-3 py-2 text-lg text-gray-50 transition-all duration-300'>Mua
                                        Vé
                                    </button>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center'>
                                    <p className='py-6 text-lg text-white italic'>Ngày công
                                        chiếu: {moment(detailsMovies.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
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
                detailsMovies.trailer ? (
                    <div className='w-full flex flex-col items-center justify-center p-20 space-y-6'>
                        <h3 className='text-white text-2xl'>Trailer</h3>
                        <ReactPlayer url={detailsMovies.trailer} width="850px" height='480px'/>
                    </div>
                ) : (<></>)
            }
        </div> : <></>
    );
}

export default DetailMovies;