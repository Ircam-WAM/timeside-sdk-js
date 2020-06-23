import { TimesideApi } from '../apis/TimesideApi'
import {
  HTTPHeaders,
  FetchAPI,
  FetchParams,
  RequestContext,
  Configuration
} from '../runtime'
import { JWTToken } from './JWTToken'

export interface ServerSideConfigurationParameters {
  username: string;
  password: string;

  basePath?: string; // override base path
  fetchApi?: FetchAPI; // override for fetch implementation
  headers?: HTTPHeaders; //header params we want to use on every request
}

// Configuration for server-side API calls
// - Auto login when refresh token is expired (or does not exist)
// - Auto refresh access token when expired
export function ServerSideConfiguration(config: ServerSideConfigurationParameters): Configuration {
  let token: JWTToken

  const credentials = {
    username: config.username,
    password: config.password
  }

  const rawConfig = {
    basePath: config.basePath,
    fetchApi: config.fetchApi,
    headers: config.headers
  }

  const rawApi = new TimesideApi(new Configuration(rawConfig))

  return new Configuration({
    ...rawConfig,
    accessToken: () => token ? token.access.base64 : '',
    middleware: [
      {
        pre: async (context: RequestContext): Promise<FetchParams | void> => {
          // Token do not exist or refresh token is expired
          if (!token || token.refresh.isExpired()) {
            const { access, refresh } = await rawApi.createTokenObtainPair({ tokenObtainPair: credentials })
            token = JWTToken.fromBase64(access, refresh)

            // Override the token in the request
            const newHeaders = { ...context.init.headers }
            newHeaders['Authorization'] = `Bearer ${token.access.base64}`
            context.init.headers = newHeaders
          }

          // Token exist, refresh token IS NOT expired, access token IS expired
          if (token && !token.refresh.isExpired() && token.access.isExpired()) {
            const tokenRefresh = { refresh: token.refresh.base64 }
            const resp = await rawApi.createTokenRefresh({ tokenRefresh })
            token.updateAccessToken(resp.access)

            // Override the token in the request
            const newHeaders = { ...context.init.headers }
            newHeaders['Authorization'] = `Bearer ${token.access.base64}`
            context.init.headers = newHeaders
          }

          return {
            url: context.url,
            init: context.init
          }
        }
      }
    ]
  })
}
