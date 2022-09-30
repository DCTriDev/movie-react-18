import React, { Suspense } from 'react'
import { Router, Switch } from 'react-router-dom'

import LoadingAnim from '@components/loadingAnim/LoadingAnim'
import { routerTemplates } from '@routers/Router'
import { history } from '@utils/Libs/history'

function App() {
  return (<>
    <LoadingAnim />
    <Router history={history}>
      <Suspense fallback={<></>}>
        <Switch>
          {routerTemplates}
        </Switch>
      </Suspense>
    </Router>
  </>)
}

export default App
