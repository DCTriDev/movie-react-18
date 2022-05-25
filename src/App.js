import React, {Suspense} from 'react';
import {Router, Switch} from "react-router-dom";
import LoadingAnim from "./Components/LoadingAnim/LoadingAnim";
import {routerTemplates} from "./Routers/Router";
import {history} from "./Utils/Libs/History";

function App() {
    return (<>
        <LoadingAnim/>
        <Router history={history}>
            <Suspense fallback={<></>}>
                <Switch>
                    {routerTemplates}
                </Switch>
            </Suspense>
        </Router>
    </>);
}

export default App;
