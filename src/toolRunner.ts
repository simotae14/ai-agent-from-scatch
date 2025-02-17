import type OpenAI from 'openai'

const getWeather = (input: any) => `hot, 90deg`

export const runTool = async (
  toolCall: OpenAI.Chat.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  // input to provide to the function
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input)
    default:
      throw new Error(`Unknown Tool: ${toolCall.function.name}`)
  }
}
