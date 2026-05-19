import { Bot, User } from 'lucide-react'
import type { Message } from '@/types'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-[80%] bg-sky-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {message.content}
        </div>
        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 self-end">
          <User className="h-4 w-4 text-sky-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 self-end">
        <Bot className="h-4 w-4 text-sky-600" />
      </div>
      <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 leading-relaxed shadow-sm border border-gray-100">
        {message.content || <span className="text-gray-400 italic text-xs">thinking…</span>}
      </div>
    </div>
  )
}
