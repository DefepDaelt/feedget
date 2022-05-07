import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from './../MailAdapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "45a0e6fc1c4c2d",
    pass: "d951da90cbc36e"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <suport@feedget.com>',
      to: 'Sh4d0w <deeps@sh4d0wlab.com>',
      subject,
      html: body
    })
  }
}