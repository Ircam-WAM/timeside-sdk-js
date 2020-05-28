import {
  FetchParams,
  RequestContext,
  Configuration,
  ConfigurationParameters
} from '../runtime'
import { TimesideApi } from '../apis/TimesideApi'
import { PersistentJWTToken } from './PersistentJWTToken'

export function AutoRefreshConfiguration (configuration: ConfigurationParameters,
                                          persistentToken: PersistentJWTToken): ConfigurationParameters {
    // rawApi is the the api without jwt middlewares (to login or refresh tokens)
    const rawApi = new TimesideApi(new Configuration(configuration))

    const autoRefreshConfig: ConfigurationParameters = {
      // extend user configuration
      ...configuration,

      accessToken: () => {
        const token = persistentToken.token
        if (!token) {
          return ''
        }
        return token.access.base64
      },

      middleware: [
        {
          // Refresh the access token before the request if accessToken is expired
          pre: async (context: RequestContext): Promise<FetchParams | void> => {
            if (persistentToken.hasToken() && persistentToken.token.shouldRefresh()) {
              const tokenRefresh = { refresh: persistentToken.token.refresh.base64 }
              const resp = await rawApi.createTokenRefresh({ tokenRefresh })
              if (!resp.access) {
                throw new Error('unexpected empty access token')
              }
              persistentToken.updateAccessToken(resp.access)

              // Override the token in the request
              const newHeaders = new Headers(context.init.headers)
              newHeaders.set('Authorization', `Bearer ${resp.access}`)
              context.init.headers = newHeaders
            }

            return {
              url: context.url,
              init: context.init
            }
          },
        },
        // Add user's middleware after refresh middleware
        ...(configuration.middleware || [])
      ]
    }

    return autoRefreshConfig
  }
