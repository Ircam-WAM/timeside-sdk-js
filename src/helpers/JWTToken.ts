import jwtDecode from 'jwt-decode'

interface RawToken {
  access: string;
  refresh: string;
}

interface DecodedToken {
  exp: number;
  jti: string;
  token_type: string;
  user_id: string;
}

export class JWTTokenComponent {
  readonly base64: string;
  readonly decoded: DecodedToken;

  constructor (base64: string) {
    this.base64 = base64
    this.decoded = jwtDecode<DecodedToken>(base64)
  }

  // We use an offset of 5s to refresh the token before it expired
  isExpired (offsetMs = 5000): boolean {
    return (Date.now() + offsetMs) >= this.decoded.exp * 1000
  }
}

// Use readonly to force usage of updateAccessToken
export class JWTToken {
  access: JWTTokenComponent;
  readonly refresh: JWTTokenComponent;

  constructor (access, refresh) {
    this.access = access
    this.refresh = refresh
  }

  static fromBase64(accessBase64: string, refreshBase64: string) {
    const access = new JWTTokenComponent(accessBase64)
    const refresh = new JWTTokenComponent(refreshBase64)

    return new this(access, refresh)
  }

  static fromSerialized(serialized: string): JWTToken {
    const untyped = JSON.parse(serialized)
    if (!untyped.access || !untyped.refresh) {
      throw new Error('InvalidToken')
    }
    return this.fromBase64(untyped.access, untyped.refresh)
  }

  updateAccessToken (accessTokenBase64: string): void {
    this.access = new JWTTokenComponent(accessTokenBase64)
  }

  shouldRefresh (): boolean {
    // Useless to try to refresh the access token
    // if the refresh token is expired
    if (this.refresh.isExpired()) {
      return false
    }
    return this.access.isExpired()
  }

  serialize (): string {
    const raw = {
      access: this.access.base64,
      refresh: this.refresh.base64
    }
    return JSON.stringify(raw)
  }
}
