// noinspection JSCheckFunctionSignatures

import { nanoid } from '@reduxjs/toolkit';

import React, { lazy } from 'react';
import MainTemplate from "../Template/Main/MainTemplate";

const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))

export const routerMainTemplate = [
    { path: process.env.REACT_APP_LINK_HOME, componentPage: HomePage }
];


const renderMainTemplate = (() => {
    //Need Declare same id to react can't switch case properly in react-router
    const idUserTemplate = nanoid();
    return routerMainTemplate.map(({ componentPage, path }) => (
        <MainTemplate key={idUserTemplate} Component={componentPage} path={path} exact />
    ));
})();


export const routerTemplates = [...renderMainTemplate];
