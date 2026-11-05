export interface EmailMessage {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export interface EmailSendResult {
  id: string;
  accepted: string[];
  rejected: string[];
}

export interface EmailProvider {
  name: string;
  send(message: EmailMessage): Promise<EmailSendResult>;
  healthCheck(): Promise<boolean>;
}
