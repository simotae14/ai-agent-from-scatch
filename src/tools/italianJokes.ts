import { z } from 'zod'
import type { ToolFn } from '../../types' // interface for tool types
import fetch from 'node-fetch'

export const italianJokesToolDefinition = {
  name: 'italian_joke',
  parameters: z.object({}),
  description: 'get an italian joke',
}

type Args = z.infer<typeof italianJokesToolDefinition.parameters>

export const italianJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const res = await fetch(
    'https://italian-jokes.vercel.app/api/jokes?subtype=One-liner',
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return (await res.json()).joke
}
