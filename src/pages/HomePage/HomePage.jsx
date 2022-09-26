import React from 'react'
import ListMovie from './ListMovies/ListMovie'

function HomePage() {
  return (
    <div className='min-h-screen'>
      <ListMovie />
    </div>
  )
}

export default React.memo(HomePage)
