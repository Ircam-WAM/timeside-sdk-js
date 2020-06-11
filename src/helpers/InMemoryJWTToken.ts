import { JWTToken } from './JWTToken'
import { PersistentJWTToken } from './PersistentJWTToken'

export class InMemoryJWTToken implements PersistentJWTToken {
  protected _token: Readonly<JWTToken | undefined>;

  init () {
    // No-op
  }

  hasToken () {
    return this._token !== undefined
  }

  get token () {
    return this._token
  }

  set token (token: JWTToken) {
    this._token = token
  }

  saveToken () {
    // No-op
  }

  removeToken () {
    this._token = undefined
  }

  updateAccessToken(accessTokenBase64: string): void {
    if (!this._token) {
      throw new Error('unable to set access token without refresh token')
    }
    this._token.updateAccessToken(accessTokenBase64)
    this.saveToken()
  }
}
