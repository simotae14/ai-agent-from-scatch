import { generateImageToolDefinition } from './generateImage'
import { dadJokeToolDefinition } from './dadJoke'
import { italianJokeToolDefinition } from './italianJoke'
import { redditToolDefinition } from './reddit'

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  italianJokeToolDefinition,
]
