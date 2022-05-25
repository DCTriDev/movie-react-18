import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./Redux/store";

const root=createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

export default store;

reportWebVitals();
