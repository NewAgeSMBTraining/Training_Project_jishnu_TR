import { User } from "./user";

export interface Entity {
  id?: number;
  active?: boolean;
  created_at?: string;
  created_by?: number;
  updated_at?: string;
  updated_by?: number;
  deleted_at?: string;
  created_user?: User;
  updated_user?: User;
}
