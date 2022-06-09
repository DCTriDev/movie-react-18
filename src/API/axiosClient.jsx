import Axios from "axios";
import store from "../index";
import {startLoading, stopLoading} from "../Redux/Slice/loadingAnimSlice";
import queryString from "query-string";
import localServices from "../Services/local.service";

class AxiosClient {
    axios;
    axiosConfig;
    authService;

    constructor() {
        this.axios = Axios.create({
            baseURL: this.getBaseUrl(),
        });
        this.getAxiosConfig();
    }

    getBaseUrl() {
        return process.env.REACT_APP_API_BASE_URL;
    }

    getAxiosConfig = (_token) => {
        const token = _token ? _token : localServices.getAccessToken();
        this.axiosConfig = {
            headers: {
                TokenCybersoft: process.env.REACT_APP_API_TOKEN_CYBERSOFT,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                Authorization: `Bearer ${token}`,
            },
            paramsSerializer: (params) => {queryString.stringify(params)},
        };
    };

    removeAxiosConfig = () => {
        this.axiosConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };
    };

    getMethod(uri, loading = true) {
        return this.handleFlow(this.axios.get(uri, this.axiosConfig), loading);
    }

    postMethod(uri, data, loading = true) {
        return this.handleFlow(
            this.axios.post(uri, data, this.axiosConfig),
            loading
        );
    }

    putMethod(uri, data, loading = true) {
        return this.handleFlow(
            this.axios.put(uri, data, this.axiosConfig),
            loading
        );
    }

    patchMethod(uri, data, loading = true) {
        return this.handleFlow(
            this.axios.patch(uri, data, this.axiosConfig),
            loading
        );
    }

    deleteMethod(uri, loading = true) {
        return this.handleFlow(this.axios.delete(uri, this.axiosConfig), loading);
    }

    handleFlow(method, loading = true) {
        loading && store.dispatch(startLoading());
        return new Promise((resolve, reject) => {
            method
                .then((res) => {
                    loading && store.dispatch(stopLoading());
                    resolve({
                        data: res.data,
                        status: res.status,
                        isSuccess: true,
                    });
                })
                .catch((err) => {
                    loading && store.dispatch(stopLoading());

                    this.handleError(err);
                    reject({
                        err: err.response.data.content
                    });
                });
        });
    }

    handleError = (err) => {
        const status = err.response?.status;
        switch (
            status
            // case 400:
            // case 401:
            // case 403:
            //   window.location.assign("/lms");
            //   break;
            // default:
            //   break;
            ) {
        }
    };
    //
    axiosInstance = (req) => {
        this.axios(req, this.axiosConfig);
    };
}

const AxiosServices = new AxiosClient();
export default AxiosServices;
