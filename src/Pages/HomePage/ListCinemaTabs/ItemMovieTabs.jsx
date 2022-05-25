import React from 'react';
import moment from "moment";
import './ListCinemaTabs.css'


function ItemMovieTabs({data}) {
    return (
        <div className='flex flex-col gap-3 h-full overflow-y-scroll scroll-custom'>
            {
                data.danhSachPhim.map((movie, index) => {
                    return (
                        <div key={index} className='h-28 flex gap-3'>
                            <img className='w-28 h-full object-cover' src={movie?.hinhAnh} alt="..."/>
                            <div className='flex flex-col overflow-y-scroll flex-grow'>
                                <h4>{movie.tenPhim}</h4>
                                <div className='flex gap-3 flex-wrap'>
                                    {movie.lstLichChieuTheoPhim.map((item, index) => {
                                        return (
                                            <div
                                                className='h-8 w-36 flex justify-center items-center bg-gray-200 border border-gray-300 rounded-lg cursor-pointer'
                                                key={index}>
                                                <span>
                                                    {moment(item.ngayChieuGioChieu).format('DD/MM')}{' - '}
                                                    {moment(item.ngayChieuGioChieu).format('hh:mm')}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ItemMovieTabs;