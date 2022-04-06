import { Domain, EmailPriority, EmailRequest, EmailRequestDto, EmailTemplate, Sender } from "./types";
import {AxiosInstance} from "axios";
const axios = require("axios").default;

export class EZMailerClient {

    private api: AxiosInstance;

    constructor(private readonly baseURL: string) {
        this.api = axios.create({
            baseURL,
        });
    }

    public async createDomain(domain: string): Promise<Domain> {
        return (await this.api.post('domains', {
            domain,
        })).data;
    }

    public async getDomains(): Promise<Domain[]> {
        return (await this.api.get('domains')).data;
    }

    public async getDomain(id: string): Promise<Domain> {
        return (await this.api.get(`domains/${id}`)).data;
    }

    public async getDomainSenders(id: string): Promise<Sender> {
        return (await this.api.get(`domains/${id}/senders`)).data;
    }

    public async getDomainEmails(id: string): Promise<EmailRequest[]> {
        return (await this.api.get(`domains/${id}/emails`)).data;
    }

    public async updateDomain(id: string, domain: string): Promise<Domain> {
        return (await this.api.put(`domains/${id}`, {
            domain,
        })).data;
    }

    public async removeDomain(id: string): Promise<void> {
        return (await this.api.delete(`domains/${id}`));
    }

    public async createSender(domain: Domain, name: string, email: string): Promise<Sender> {
        return (await this.api.post('senders', {
            domainId: domain.id,
            name,
            email,
        })).data;
    }

    public async getSender(id: string): Promise<Sender> {
        return (await this.api.get(`senders/${id}`)).data;
    }

    public async getSenders(): Promise<Sender[]> {
        return (await this.api.get('senders')).data;
    }

    public async getSenderEmails(id: string): Promise<EmailRequest[]> {
        return (await this.api.get(`senders/${id}/emails`)).data;
    }

    public async updateSender(id: string, domain: Domain, name: string, email: string): Promise<Sender> {
        return (await this.api.put(`senders/${id}`, {
            domainId: domain.id,
            name,
            email,
        })).data;
    }

    public async removeSender(id: string): Promise<void> {
        return (await this.api.delete(`senders/${id}`));
    }

    public async getTemplates(): Promise<EmailTemplate[]> {
        return (await this.api.get('templates')).data;
    }

    public async getTemplate(id: string): Promise<EmailTemplate> {
        return (await this.api.get(`templates/${id}`)).data;
    }

    public async createTemplate(name: string, body: string): Promise<EmailTemplate> {
        return (await this.api.post(`templates`, {name, body})).data;
    }

    public async duplicateTemplate(template: EmailTemplate): Promise<EmailTemplate> {
        return (await this.api.post(`templates/${template.id}/duplicate`)).data;
    }

    public async updateTemplate(id: string, body: string): Promise<EmailTemplate> {
        return (await this.api.put(`templates/${id}`, {body})).data;
    }

    public async removeTemplate(id: string): Promise<void> {
        return (await this.api.delete(`templates/${id}`));
    }

    public async sendEmail(sender: Sender, template: EmailTemplate, dto: EmailRequestDto): Promise<EmailRequest> {
        return (await this.api.post('emails', {
            templateId: template.id,
            senderId: sender.id,
            subject: dto.subject,
            context: dto.context,
            to: dto.to.join(','),
            cc: dto.cc ? dto.cc.join(',') : void 0,
            bcc: dto.bcc ? dto.bcc.join(','): void 0,
            priority: dto.priority ? dto.priority : EmailPriority.Normal,
        })).data;
    }
}