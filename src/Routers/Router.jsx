import React, {lazy} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import MainTemplate from "../Template/Main/MainTemplate";
import {Route} from "react-router-dom";

const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))
const LogInPage = lazy(() => import("../Pages/LogInPage/LogInPage"))
const SignUpPage = lazy(() => import("../Pages/SignUpPage/SignUpPage"))
const DetailMovie = lazy(() => import("../Pages/DetailMovies/DetailMovie"))

export const routerMainTemplate = [
    {path: process.env.REACT_APP_LINK_HOME, componentPage: HomePage},
    {path: process.env.REACT_APP_LINK_DETAIL_MOVIE+'/:maPhim', componentPage: DetailMovie},
];

export const routerNoneTemplate = [
    { path: process.env.REACT_APP_LINK_LOG_IN, componentPage: LogInPage },
    { path: process.env.REACT_APP_LINK_SIGN_UP, componentPage: SignUpPage }
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


export const routerTemplates = [...renderMainTemplate, ...renderNoneTemplate];
