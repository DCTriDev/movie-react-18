import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ItemMovie from "./ItemMovie";
import {fetchListMovie} from "../../../Redux/Slice/movieSlice";

function ListMovie() {
    const RENDER_AMOUNT = 12;
    const dispatch = useDispatch()
    const listMovie = useSelector(state => state.movieSlice.listMovie)

    useEffect(() => {
        !listMovie&&dispatch(fetchListMovie())
    }, [])

    return (
        <div className='mx-auto py-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 lg:gap-8 gap-3 lg:max-w-[1200px] max-w-[95vw]'>
            {listMovie?.map((item, key) => {
                if (key < RENDER_AMOUNT) {
                    return <ItemMovie data={item} key={key}/>
                }
            })}
        </div>
    );
}

export default React.memo(ListMovie);
