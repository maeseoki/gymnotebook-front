export interface JwtPayload {
  sub: string
  roles: Role[]
  iat: number
  exp: number
}

export interface Role {
  authority: Roles
}

// Roles can be also empty
export enum Roles {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MODERATOR = 'ROLE_MODERATOR'
}

export interface Children {
  children?: ReactNode
}

export interface User {
  authenticated: boolean
  name?: string
  authToken?: string
  roles?: Roles[]
}

export interface AuthContextData {
  user: User | null
  setUser: (token: string | null) => void
  removeUser: () => void
}

export interface Auth {
  user: User | null
  addUser: (token: string | null) => void
  removeUser: () => void
}

export interface LocalStorage {
  value: string | null
  setItem: (value: string) => void
  removeItem: () => void
}

export interface GenericResponse {
  message: string
}

type Token = `${string}.${string}.${string}`

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  id: number
  username: string
  email: string
  roles: Roles[]
  accessToken: Token
  tokenType: 'Bearer'
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
  role: Roles[]
}

export interface SignUpResponse extends GenericResponse {}

export interface VerifyUserRequest {
  username: string
  email: string
}

export interface VerifyUserResponse extends GenericResponse {}

export interface LogoutResponse extends GenericResponse {}
