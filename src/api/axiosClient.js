import Axios from 'axios'
import { message } from 'antd'

import { startLoading, stopLoading } from '@redux/slice/loadingAnimSlice'
import { removeUserInfo } from '@redux/slice/userSlice'
import localServices from '@services/local.service'
import localService from '@services/local.service'
import store from '../index'

class AxiosClient {
  axios
  axiosConfig
  authService

  constructor() {
    this.axios = Axios.create({
      baseURL: this.getBaseUrl(),
      timeout: 15000,
      mode: 'cors',
    })
    this.getAxiosConfig()
  }

  getBaseUrl() {
    return process.env.REACT_APP_API_BASE_URL
  }

  getAxiosConfig() {
    const token = localServices.getAccessToken()
    this.axiosConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, X-Requested-With, Authorization',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': token,
      },
    }
  };

  removeAxiosConfig = () => {
    this.axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  getMethod(data, loading = true) {
    return this.handleFlow(
      this.axios.get('', data, this.axiosConfig),
      loading,
    )
  }

  postMethod(data, loading = true) {
    return this.handleFlow(
      this.axios.post('', data, this.axiosConfig),
      loading,
    )
  }

  putMethod(data, loading = true) {
    return this.handleFlow(
      this.axios.put('', data, this.axiosConfig),
      loading,
    )
  }

  patchMethod(data, loading = true) {
    return this.handleFlow(
      this.axios.patch('', data, this.axiosConfig),
      loading,
    )
  }

  deleteMethod(data, loading = true) {
    return this.handleFlow(
      this.axios.delete('', data, this.axiosConfig),
      loading,
    )
  }

  handleFlow(method, loading = true) {
    loading && store.dispatch(startLoading())
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          loading && store.dispatch(stopLoading())
          if (res.data.errors) {
            this.handleError(res.data.errors)
          }
          resolve(res.data)
        })
        .catch((err) => {
          loading && store.dispatch(stopLoading())
          this.handleError(err)
          reject(err)
        })
    })
  }

  handleError = (error) => {
    const firstError = error[0]
    switch (firstError.status) {
      case 404: {
        message.error(firstError.message, 3)
        break
      }
      case 401: {
        message.error(firstError.message, 3)
        localService.removeUserInfo()
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
        removeUserInfo()
        break
      }
      case 406: {
        message.warning(firstError.message, 3)
        break
      }
      case 403: {
        message.error(firstError.message, 3)
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
        break
      }
      case 400: {
        message.error(firstError.message, 3)
        break
      }
      default:
        message.error(firstError.message, 3)
        break
    }
  }

  axiosInstance = (req) => {
    this.axios(req, this.axiosConfig)
  }
}

const AxiosService = new AxiosClient()
export default AxiosService
