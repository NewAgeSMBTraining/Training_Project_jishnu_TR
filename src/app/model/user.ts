
import { Entity } from "./entity";

export interface Role {
  id?: number;
  name?: string;
  active?: boolean;
  created_at?: string;
  updated_by?: number;
  deleted_at?: string;
}

export interface User extends Entity {
  role_id?: number;
  role?: Role
  uid?: string;
  google_id?: string;
  facebook_id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  password?: string;
  image?: string;
  last_login_at?: string;
  phone?: string;
}

export interface UserFilter {
  active?: number | string;
  role_id?: any;
}

