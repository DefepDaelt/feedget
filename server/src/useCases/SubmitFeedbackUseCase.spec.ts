import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64,asdkuashdigkha\gejyauirhykagk'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64,asdkuashdigkha\gejyauirhykagk'
    })).rejects.toThrow()
  })

  it('should be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asdkuashdigkha\gejyauirhykagk'
    })).rejects.toThrow()
  })

  it('should be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  })
})