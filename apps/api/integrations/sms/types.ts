export interface SmsMessage {
  to: string;
  body: string;
  senderId?: string;
}

export interface SmsSendResult {
  id: string;
  status: "queued" | "sent" | "failed";
}

export interface SmsProvider {
  name: string;
  send(message: SmsMessage): Promise<SmsSendResult>;
  healthCheck(): Promise<boolean>;
}
