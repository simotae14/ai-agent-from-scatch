import { z } from 'zod'
import type { ToolFn } from '../../types' // interface for tool types
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        `prompt for the image. Be sure to consider the user's original message when making the prompt. If you are unsure, then ask the user to provide more details.`
      ),
  }),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `${toolArgs.prompt}`,
    n: 1, // number of images to generate
    size: '1024x1024',
  })

  return response.data[0].url!
}
