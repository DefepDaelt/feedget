import { FormEvent, useState } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../../libs/api"
import { ButtonScreenshot } from "../../../Button"
import { Header } from "../../../Header"
import { Loading } from "../../../Loading"

interface FeedbackContentStepProps {
  feedbackType: FeedbackType,
  onFeedbackRestartRequested: () => void,
  onFeedbackSend: () => void
}

export const FeedbackContentStep = ({ 
  feedbackType, 
  onFeedbackRestartRequested,
  onFeedbackSend
}: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedbacks, setIsSendingFeedbacks] = useState(false)
  
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault()

    setIsSendingFeedbacks(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      screenshot,
      comment
    })
    
    setIsSendingFeedbacks(false)
    onFeedbackSend()
  }
  
  return (
    <>
      <Header 
        title={feedbackTypeInfo.title}
        icon={feedbackTypeInfo.image}
        isFirstSpep={false}
        onFeedbackRestartRequested={onFeedbackRestartRequested}
      />

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ButtonScreenshot
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedbacks}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            { isSendingFeedbacks ? <Loading /> : 'Enviar feedback' }
          </button>
        </footer>
      </form>
    </>
  )
}