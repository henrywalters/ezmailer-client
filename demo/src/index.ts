import {EZMailerClient} from 'ezmailer-client';
import { EmailTemplate, Sender } from '../../dist/types';

const client = new EZMailerClient('https://ezmailer.henrywalters.dev');

const demo = async () => {
    const domains = await client.getDomains();

    let domain = domains.find(d => d.domain === 'henrywalters.dev');
    
    if (!domain) {
        domain = await client.createDomain('henrywalters.dev');
    }

    const senders = await client.getSenders();

    let sender = senders.find(s => s.email === 'me');

    if (!sender) {
        sender = await client.createSender(domain, 'Henry Walters', 'me');
    }

    const templates = await client.getTemplates();

    let template = templates.find(t => t.name === 'Demo Email');

    if (!template) {
        template = await client.createTemplate('Demo Email', 'Hello {{name}}, this is a demo email from EZMailer');
    }

    console.log(template);

    const email = await client.sendEmail(sender, template, {
        to: ["walla3nm@gmail.com"],
        subject: "Demo Email",
        context: {
            name: "Big Dog Wallace"
        },
        bcc: ["henrywalters20@gmail.com"]
    });

    console.log(email);
};

demo();