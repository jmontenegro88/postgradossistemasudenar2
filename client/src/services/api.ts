import url from 'url'
import axios, { AxiosRequestConfig } from 'axios'
import defaultsDeep from 'lodash/defaultsDeep'

const _authHeaders = (token: string): any => ({
  Authorization: `Bearer ${token}`,
})

const API = {
  API_URL: process.env.VUE_APP_API_URL || '/',
  getUrl(path: string) {
    return url.resolve(this.API_URL, path)
  },

  getRequest(path: string, config?: AxiosRequestConfig) {
    return axios.get(this.getUrl(path), config)
  },

  postRequest(path: string, data?: any, config?: AxiosRequestConfig) {
    return axios.post(this.getUrl(path), data, config)
  },

  async getRequestWithAuth(
    path: string,
    token: string | null,
    config?: AxiosRequestConfig
  ) {
    if (!token) {
      throw new Error('Usuario no autenticado')
    }
    return axios.get(
      this.getUrl(path),
      defaultsDeep(config, {
        headers: _authHeaders(token),
      })
    )
  },

  async postRequestWithAuth(
    path: string,
    token: string | null,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    if (!token) {
      throw new Error('Usuario no autenticado')
    }
    return axios.post(
      this.getUrl(path),
      data,
      defaultsDeep(config, {
        headers: _authHeaders(token),
      })
    )
  },
}

export default API
