import React from 'react'
import {useParams} from 'react-router-dom'

function WatchMovie(props) {
    const {id} = useParams()
    console.log(id)
    console.log(props)
    return (
        <div className='min-h-screen'>

        </div>
    )
}

export default WatchMovie
