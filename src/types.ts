
export interface Domain {
    id: string;
    domain: string;
}

export interface Sender {
    id: string;
    domain: Domain;
    name: string;
    email: string;
}

export interface EmailTemplate {
    id: string;
    name: string;
    version: number;
    body: string;
}

export enum EmailStatus {
    Pending = 'pending',
    Sent = 'sent',
    Rejected = 'rejected',
};

export enum EmailPriority {
    Low = 'low',
    Normal = 'normal',
    High = 'high',
}

export interface EmailRequest {
    id: string;
    createdAt: string;
    lastUpdate: string;
    sender: Sender;
    subject: string;
    body: string;
    to: string;
    cc: string;
    bcc: string;
    status: EmailStatus;
    priority: EmailPriority;
    attempts: number;
}

export interface EmailRequestDto {
    subject: string;
    context: object;
    to: string[];
    cc: string[];
    bcc: string[];
    priority?: EmailPriority;
}
