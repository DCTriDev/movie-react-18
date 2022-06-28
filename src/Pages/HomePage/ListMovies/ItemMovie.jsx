import React from 'react';
import {NavLink} from "react-router-dom";

function ItemMovie({data}) {
    const stringShorthand = (string, number) => {
        return string.substring(0, number) + '...'
    }
    return (
        <div className=' bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:scale-105 ease-in-out duration-500 transition-all drop-shadow-2xl'>
            <img className='w-full h-52 object-cover' src={data.hinhAnh} alt=""/>
            <div className='mt-4 px-6 flex flex-col justify-between'>
                <div className='h-20 w-full flex items-center justify-center'>
                    <h3 className='uppercase text-center text-amber-700 font-bold text-2xl'>{data.tenPhim}</h3>
                </div>
                <div className='w-full'>
                    <p>{stringShorthand(data.moTa, 100)}</p>
                    <p className='text-right italic mr-3'>Đánh giá: {data.danhGia}/10</p>
                </div>
                <div className='w-full flex justify-center my-3'>
                    <NavLink to={`${process.env.REACT_APP_LINK_DETAIL_MOVIE}/${data.maPhim}`}>
                        <button className='mx-auto bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-gray-50 hover:text-white hover:-translate-y-0.5 duration-300'>
                            Xem Chi Tiết
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ItemMovie;
