import type { AIMessage } from '../types'
import { addMessages, getMessages } from './memory'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  // add the message to the db
  await addMessages([{ role: 'user', content: userMessage }])

  // show a loader
  const loader = showLoader('🤔 Thinking...')
  // get the history of messages
  const history = await getMessages()

  // call the llm function
  const response = await runLLM({
    messages: history,
    tools,
  })

  // handle the case response has tool_calls
  if (response.tool_calls) {
    console.log(response.tool_calls)
  }

  // then we need to add the response we received from the LLM to the db
  await addMessages([response])

  // stop the loader
  loader.stop()

  // return all the messages
  return getMessages()
}
