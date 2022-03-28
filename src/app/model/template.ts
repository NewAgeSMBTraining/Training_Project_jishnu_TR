import { Entity } from "./entity";

export interface Template extends Entity {
  name?: string;
  title?: string;
  send_email?: boolean;
  email_subject?: string;
  email_body?: string;
  send_sms?: boolean;
  sms_body?: string;
}

export interface TemplateFilter {}
