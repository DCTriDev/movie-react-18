import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ItemMovie from "./ItemMovie";
import {fetchListMovie} from "../../../Redux/Slice/movieSlice";

function ListMovie() {
    const dispatch = useDispatch()

    let listMovie = useSelector(state => state.movieSlice.listMovie)

    console.log(listMovie)
    useEffect(() => {
        dispatch(fetchListMovie())
    }, [])

    return (
        <div className='px-8 py-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8'>
            {listMovie?.map((item, key) => {
                return <ItemMovie data={item} key={key}/>
            })}
        </div>
    );
}

export default ListMovie;
