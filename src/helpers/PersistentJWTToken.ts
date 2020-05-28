import { JWTToken } from './JWTToken'

export interface PersistentJWTToken {
  init (): void;
  hasToken (): boolean;
  updateAccessToken (base64: string): void;
  token: Readonly<JWTToken | undefined>;

  saveToken (): void;
  removeToken (): void;
}

export class LocalStorageJWTToken implements PersistentJWTToken {
  protected _token: Readonly<JWTToken | undefined>;
  readonly localStorageKey: string;

  constructor (localStorageKey = 'timeside-api-token') {
    this.localStorageKey = localStorageKey
  }

  init () {
    // setToken can throw InvalidTokenError (from jwtDecode)
    try {
      this._token = this.getFromPersistentStorage()
      if (!this._token) {
        return
      }
      if (this._token.refresh.isExpired()) {
        this.removeToken()
      }
    } catch (e) {
      console.error(`Invalid token (${JSON.stringify(e.message)}). Deleting it from localStorage`)
      this.removeToken()
    }
  }

  private getFromPersistentStorage (): JWTToken | undefined {
    if (!window.localStorage) {
      throw new Error('window.localStorage is undefined')
    }
    const raw = localStorage.getItem(this.localStorageKey)
    if (!raw) {
      return undefined
    }
    return JWTToken.fromSerialized(raw)
  }

  updateAccessToken (accessTokenBase64: string) {
    if (!this._token) {
      throw new Error('unable to set access token without refresh token')
    }
    this._token.updateAccessToken(accessTokenBase64)
    this.saveToken()
  }

  hasToken () {
    return this._token !== undefined
  }

  get token () {
    return this._token
  }

  set token (token: JWTToken) {
    this._token = token
    this.saveToken()
  }

  saveToken () {
    localStorage.setItem(this.localStorageKey, this._token.serialize())
  }

  removeToken () {
    this._token = undefined
    localStorage.removeItem(this.localStorageKey)
  }
}
