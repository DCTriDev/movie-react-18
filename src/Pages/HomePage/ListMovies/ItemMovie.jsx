import React from 'react';
import {NavLink} from "react-router-dom";

function ItemMovie({data}) {
    return (
        <NavLink className='overflow-hidden cursor-pointer text-text-color-primary hover:text-text-color-secondary ease-in-out duration-500 transition-all drop-shadow-2xl'
             to={`/detail-movie/${data.id}`}
        >
            <img className='w-full lg:h-[265px] md:h-[250px] h-[190px] object-cover rounded-xl' src={data?.image} alt="image"/>
            <h3 className='text-inherit text-ellipsis whitespace-nowrap mt-3 truncate lg:text-[16px] md:text-[15px] text-[14px]'>{data?.title}</h3>
        </NavLink>
    );
}

export default ItemMovie;
