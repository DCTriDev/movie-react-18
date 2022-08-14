import React, {lazy} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import MainTemplate from "../Template/Main/MainTemplate";
import {Route} from "react-router-dom";

const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))
const LogInPage = lazy(() => import("../Pages/LogInPage/LogInPage"))
const SignUpPage = lazy(() => import("../Pages/SignUpPage/SignUpPage"))
const ProfilePage = lazy(() => import("../Pages/ProfilePage/ProfilePage"))
const DetailMovie = lazy(() => import("../Pages/DetailMovies/DetailMovie"))
const WatchMovie = lazy(() => import("../Pages/WatchMovie/WatchMovie"))
const DepositPage = lazy(() => import("../Pages/DepositPage/DepositPage"))
const DashboardPage = lazy(() => import("../Pages/DashboardPage/DashboardPage"))
const ComingSoon = lazy(() => import("../Components/ComingSoon/ComingSoon"))

export const routerMainTemplate = [
    {path: process.env.REACT_APP_LINK_HOME, componentPage: HomePage},
    {path: process.env.REACT_APP_LINK_DETAIL_MOVIE + '/:id', componentPage: DetailMovie},
    {path: process.env.REACT_APP_LINK_ALL_CONTENTS, componentPage: ComingSoon},
    {path: process.env.REACT_APP_LINK_NEWS, componentPage: ComingSoon},
    {path: process.env.REACT_APP_LINK_WATCH + '/:id', componentPage: WatchMovie},
    {path: process.env.REACT_APP_LINK_DEPOSIT, componentPage: DepositPage},
    {path: process.env.REACT_APP_LINK_COMING_SOON, componentPage: ComingSoon},
];

export const routerNoneTemplate = [
    {path: process.env.REACT_APP_LINK_LOG_IN, componentPage: LogInPage},
    {path: process.env.REACT_APP_LINK_SIGN_UP, componentPage: SignUpPage},
    {path: process.env.REACT_APP_LINK_PROFILE, componentPage: ProfilePage},
    {path: process.env.REACT_APP_LINK_DASHBOARD, componentPage: DashboardPage},
];


const renderMainTemplate = (() => {
    //Need Declare same id to react can't switch case properly in react-router
    const idUserTemplate = nanoid();
    return routerMainTemplate.map(({ componentPage, path }) => (
        <MainTemplate key={idUserTemplate} Component={componentPage} path={path} exact />
    ));
})();

const renderNoneTemplate = (() => {
    const idNoneTemplate = nanoid();
    return routerNoneTemplate.map(({ componentPage, path }) => (
        <Route key={idNoneTemplate} component={componentPage} path={path} exact />
    ));
})();


export const routerTemplates = [ ...renderNoneTemplate, ...renderMainTemplate,];
