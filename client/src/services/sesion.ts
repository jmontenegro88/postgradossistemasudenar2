import API from './api'

export interface LoginResult {
  token?: string
  roles?: any[]
  error?: string
  code?: string
}

export interface AuthResult {
  usuario: any
  admin?: boolean
  valido?: boolean
}

export const sesionService = {
  get token(): string | null {
    return sessionStorage.getItem('token')
  },

  set token(value: string | null) {
    if (value) {
      sessionStorage.setItem('token', value)
    } else {
      sessionStorage.removeItem('token')
    }
  },

  async login(email: string, password: string): Promise<LoginResult> {
    const { data } = await API.postRequest('/sesion/login', {
      email,
      password,
    })
    return data as LoginResult
  },

  async autenticar(token?: string): Promise<AuthResult> {
    const { data } = await API.postRequestWithAuth(
      '/sesion/autenticar',
      typeof token !== 'undefined' ? token : this.token
    )
    return data as AuthResult
  },
}

export default sesionService
