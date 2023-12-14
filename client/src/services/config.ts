import API from './api'

export interface ClientConfig {
  actualizar_datos: boolean
  actualizar_video: boolean
  certificados: boolean
  evaluacion: boolean
  registrar_poster: boolean
  talleres: boolean
}

export const configService = {
  async getClientConfig(): Promise<ClientConfig> {
    const { data } = await API.postRequest('/config/client')
    return data as ClientConfig
  },
}

export default configService
