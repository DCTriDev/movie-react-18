import React, {useEffect} from 'react';
import {Route} from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from '../../Components/Footer/Footer'

function MainTemplate({Component, ...restRoute}) {
    useEffect(() => window.scrollTo(0, 0));

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => (
                <>
                    <Navbar/>
                    <Component {...propsRoute} />
                    <Footer/>
                </>
            )}
        />
    );
}

export default MainTemplate;
