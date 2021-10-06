import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ShareMusles } from '../pages/client/sharemusle';
import { NotFound } from '../pages/404';
import { Header } from '../component/header';
import { useMe } from '../usehook/useMe';
import { Profile } from '../pages/user/profile';
import { ConfirmEmail } from '../pages/user/confirm-email';

const ClientRoutes = [
    <Route key={1} path='/' exact>
        <ShareMusles/>
    </Route>,
    <Route key={2} path='/edit-profile' exact>
        <Profile/>
    </Route>,
    <Route key={3} path='/confirm' exact>
        <ConfirmEmail/>
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
