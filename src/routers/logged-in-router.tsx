import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ShareMusles } from '../pages/client/sharemusles';
import { NotFound } from '../pages/404';
import { Header } from '../component/header';
import { useMe } from '../usehook/useMe';
import { Profile } from '../pages/user/profile';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { Search } from '../pages/client/search';
import { Country } from '../pages/client/country';

const ClientRoutes = [
    <Route key={1} path='/' exact>
        <ShareMusles/>
    </Route>,
    <Route key={2} path='/edit-profile'>
        <Profile/>
    </Route>,
    <Route key={3} path='/confirm'>
        <ConfirmEmail/>
    </Route>,
    <Route key={4} path='/search'>
        <Search/>
    </Route>,
    <Route key={5} path='/country/:slug'>
        <Country/>
    </Route>
]

export const LoggedInRouter = () => {
    const {data, error, loading} = useMe()
    if(!data || loading || error){
        return(
            <div className='h-screen flex justify-center items-center lg:bg-gray-700'>
                <span className='text-2xl font-semibold tracking-wide lg:text-white'>Loading...</span>
            </div>
        )
    }

    return(
        <Router>
            <Header/>
            <Switch>
                {data.me.role === "User" && ClientRoutes}
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    )
}
