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
import { ShareMusle } from '../pages/client/sharemusle';
import { MyShareMusles } from '../pages/owner/my-sharemusles';
import { AddShareMusle } from '../pages/owner/add-sharemusle';
import { MyshareMusle } from '../pages/owner/my-shareMusle';
import { AddService } from '../pages/owner/add-service';
import { Order } from '../pages/user/order';
import { UserRole } from '../api/globalTypes';


const clientRoutes = [
    {
        path: '/',
        component: <ShareMusles/>
    },
    {
        path: '/search',
        component: <Search/>
    },
    {
        path: '/country/:slug',
        component: <Country/>
    },
    {
        path: '/shareMusle/:id',
        component: <ShareMusle/>
    },
]

const commonRoutes = [
    {
        path:'/edit-profile',
        component:<Profile/>
    },
    {
        path:'/confirm',
        component:<ConfirmEmail/>
    },
    {
        path:'/orders/:id',
        component:<Order/>
    }
];

const guaderRoutes = [
    {
        path:'/',
        component:<MyShareMusles/>
    },{
        path:'/add-sharemusle',
        component:<AddShareMusle/>
    },{
        path:'/shareMusle/:id',
        component:<MyshareMusle/>
    },{
        path:'/shareMusle/:shareMusleId/add-service',
        component:<AddService/>
    }
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
                {data.me.role === UserRole.User && clientRoutes.map((route) => (
                    <Route exact key={route.path} path={route.path}>{route.component}</Route>
                ))}
                {data.me.role === UserRole.Guader && guaderRoutes.map((route) =>(
                    <Route exact key={route.path} path={route.path}>{route.component}</Route>
                ))}
                {commonRoutes.map((route) => (
                    <Route exact key={route.path} path={route.path}>{route.component}</Route>
                ))}
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    )
}
