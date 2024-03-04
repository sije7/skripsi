import { Route, Switch, useLocation } from 'react-router-dom';
import { Test } from "./pages/Test"

const router = createBrowserRoute ({

})

return(
    <Switch>
        <Route path="/beranda" component={Test} />
    </Switch>
)

export default router