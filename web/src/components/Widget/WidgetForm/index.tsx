import { useState } from 'react'
import BugImageUrl from '../../../assets/bug.svg'
import IdeaImageUrl from '../../../assets/idea.svg'
import ThoughtImageUrl from '../../../assets/thought.svg'
import { FeedbackContentStep } from './Steps/feedbackContent.step'
import { FeedbackSuccessStep } from './Steps/feedbackSuccess.step'
import { FeedbackTypeStep } from './Steps/feedbackTypes.step'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: BugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: IdeaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: ThoughtImageUrl,
      alt: 'Imagem de uma nuvem de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  const handleRestartFeedback = () => {
    setFeedbackSend(false)
    setFeedbackType(null)
  }
  
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">      
      { feedbackSend ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          { !feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSend={() => setFeedbackSend(true)}
            />
          )}
        </>
      ) }
      
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
      </footer>
    </div>
  )
}