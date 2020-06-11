import { JWTToken } from './JWTToken'

export interface PersistentJWTToken {
  init (): void;
  hasToken (): boolean;
  updateAccessToken (base64: string): void;
  token: Readonly<JWTToken | undefined>;

  saveToken (): void;
  removeToken (): void;
}
