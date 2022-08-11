import React from 'react'
import {NavLink} from 'react-router-dom'

function ItemActor(props) {
    const {id, name, image} = props.actor
    return (
        <NavLink className='overflow-hidden cursor-pointer text-text-color-primary hover:text-text-color-secondary ease-in-out duration-500 transition-all drop-shadow-2xl'
                 to={`/actor/${id}`}
        >
            <img className='w-full h-[265px] object-contain rounded-xl object-left' src={image} alt="image"/>
            <h3 className='text-inherit text-ellipsis whitespace-nowrap mt-3 truncate'>{name}</h3>
        </NavLink>
    )
}

export default ItemActor
