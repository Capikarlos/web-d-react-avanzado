import { ChatBot } from './components/ChatBot.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

import './index.css'

export const App = () => {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  )
}
