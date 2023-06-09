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
  setUser: (user: User | null) => void
  removeUser: () => void
}

export interface Auth {
  user: User | null
  addUser: (user: User) => void
  removeUser: () => void
}

export interface LocalStorage {
  value: string | null
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string | null
  removeItem: (key: string) => void
}
