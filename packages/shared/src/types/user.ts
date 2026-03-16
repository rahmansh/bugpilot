export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'developer' | 'viewer'
  createdAt: Date
  updatedAt: Date
}

export type UserRole = User['role']

export interface CreateUserDTO {
  email: string
  name: string
  password: string
  role?: UserRole
}

export interface UpdateUserDTO {
  email?: string
  name?: string
  role?: UserRole
}
