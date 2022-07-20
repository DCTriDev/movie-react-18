import Axios from "axios";
import store from "../index";
import {startLoading, stopLoading} from "../Redux/Slice/loadingAnimSlice";
import localServices from "../Services/local.service";

class AxiosClient {
    axios;
    axiosConfig;
    authService;

    constructor() {
        this.axios = Axios.create({
            baseURL: this.getBaseUrl(),
            timeout: 15000,
            mode: "cors"
        });
        this.getAxiosConfig()
    }

    getBaseUrl() {
        return process.env.REACT_APP_API_BASE_URL;
    }

    getAxiosConfig(_token) {
        const token = _token ? _token : localServices.getAccessToken();
        this.axiosConfig = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, X-Requested-With, Authorization',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token,
            },
        };
    };

    removeAxiosConfig = () => {
        this.axiosConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };
    };

    getMethod(data, loading = true) {
        return this.handleFlow(
            this.axios.get('', data, this.axiosConfig),
            loading
        );
    }

    postMethod(data, loading = true) {
        return this.handleFlow(
            this.axios.post('', data, this.axiosConfig),
            loading
        );
    }

    putMethod(data, loading = true) {
        return this.handleFlow(
            this.axios.put('', data, this.axiosConfig),
            loading
        );
    }

    patchMethod(data, loading = true) {
        return this.handleFlow(
            this.axios.patch('', data, this.axiosConfig),
            loading
        );
    }

    deleteMethod(data, loading = true) {
        return this.handleFlow(
            this.axios.delete('', data, this.axiosConfig),
            loading
        );
    }

    handleFlow(method, loading = true) {
        loading && store.dispatch(startLoading());
        return new Promise((resolve, reject) => {
            method
                .then((res) => {
                    loading && store.dispatch(stopLoading());
                    resolve(res);
                })
                .catch((err) => {
                    loading && store.dispatch(stopLoading());
                    this.handleError(err);
                    reject(err);
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

const AxiosService = new AxiosClient();
export default AxiosService;
