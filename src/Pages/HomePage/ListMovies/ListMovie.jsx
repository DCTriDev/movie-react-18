import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ItemMovie from "./ItemMovie";
import {fetchListMovie} from "../../../Redux/Slice/movieSlice";

function ListMovie() {
    const RENDER_AMOUNT = 12;
    const dispatch = useDispatch()
    const listMovie = useSelector(state => state.movieSlice.listMovie)
    useEffect(() => {
        dispatch(fetchListMovie())
    }, [])

    return (
        <div className='px-8 py-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8'>
            {listMovie?.map((item, key) => {
                if (key < RENDER_AMOUNT) {
                    return <ItemMovie data={item} key={key}/>
                }
            })}
        </div>
    );
}

export default React.memo(ListMovie);
