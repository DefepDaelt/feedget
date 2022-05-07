import { MailAdapter } from './../adapters/MailAdapter';
import { FeedbacksRepository } from './../repositories/FeedbacksRepository';

interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}
  
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required.')
    }

    if (!comment) {
      throw new Error('Comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: `Novo ${type} Feedback`,
      body: [
        `<div style="font-family: monospace; font-size: 16px; color: #111;">`,
        `<h1>Feedback</h1>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && `<img width="640" height="320" src="${screenshot}" />`,
        `</div>`
      ].join('\n')
    })
  }
}