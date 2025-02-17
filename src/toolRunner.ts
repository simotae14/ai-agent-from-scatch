import type OpenAI from 'openai'
import {
  generateImage,
  generateImageToolDefinition,
} from './tools/generateImage'
import { reddit, redditToolDefinition } from './tools/reddit'
import { dadJoke, dadJokeToolDefinition } from './tools/dadJoke'
import { italianJoke, italianJokeToolDefinition } from './tools/italianJoke'

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
    case generateImageToolDefinition.name:
      return generateImage(input)

    case redditToolDefinition.name:
      return reddit(input)

    case dadJokeToolDefinition.name:
      return dadJoke(input)

    case italianJokeToolDefinition.name:
      return italianJoke(input)

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else`
  }
}
