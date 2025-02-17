import { addMessages, getMessages } from './memory'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'
import { runTool } from './toolRunner'
import { saveToolResponse } from './memory'

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
  // then we need to add the response we received from the LLM to the db
  await addMessages([response])

  // handle the case response has tool_calls
  if (response.tool_calls) {
    // take just the first tool call
    const toolCall = response.tool_calls[0]

    loader.update(`executing: ${toolCall.function.name}`)

    const toolResponse = await runTool(toolCall, userMessage)

    // save the tool response in the db
    await saveToolResponse(toolCall.id, toolResponse)

    loader.update(`done: ${toolCall.function.name}`)
  }

  logMessage(response)
  // stop the loader
  loader.stop()

  // return all the messages
  return getMessages()
}
