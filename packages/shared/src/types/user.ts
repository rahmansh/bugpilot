export type Role = 'admin' | 'developer' | 'viewer';

export interface User{
  id: string,
  name: string,
  email: string,
  role: Role,
}


export interface CreateUserDTO{
  name: string;
  email: string;
  role: Role
}