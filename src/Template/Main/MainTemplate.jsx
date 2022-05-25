import React, {useEffect} from 'react';
import {Route} from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

function MainTemplate({Component, ...restRoute}) {
    useEffect(() => window.scrollTo(0, 0));

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => (
                <>
                    <Navbar/>
                    <div>
                        hello
                    </div>
                    <Component {...propsRoute} />
                </>
            )}
        />
    );
}

export default MainTemplate;
