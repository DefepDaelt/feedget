import { ArrowLeft } from "phosphor-react"
import { ButtonClose } from "../Button"

interface HeaderProps {
  title?: string,
  icon?: {
    source: string,
    alt: string 
  },
  isFirstSpep?: boolean,
  onFeedbackRestartRequested?: () => void
}

export const Header = ({ title, icon, isFirstSpep = true, onFeedbackRestartRequested }: HeaderProps) => {
  return (
    <header>
      { !isFirstSpep && (
        <button 
          type="button" 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
      )}
      
      { title && (
        <span className="text-lg leading-6 flex items-center gap-2">
          { icon && <img src={icon.source} alt={icon.alt} className="w-6 h-6" /> }
          { title }
        </span>
      )}

      <ButtonClose />
    </header>
  )
}