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
  id?: string
  name?: string
  authToken?: string
}

export interface AuthContextData {
  user: User | null
  setUser: (user: User | null) => void
}

type AuthData = [boolean, Roles[] | never[]]
