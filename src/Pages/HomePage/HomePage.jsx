import React from 'react';
import ListMovie from "./ListMovies/ListMovie";
import Banner from "./Banner/Banner";

function HomePage() {
    return (
        <div>
            {/*<Banner/>*/}
            <ListMovie/>
        </div>
    );
}

export default React.memo(HomePage);
