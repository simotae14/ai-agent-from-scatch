import { z } from 'zod'
import type { ToolFn } from '../../types' // interface for tool types
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description: 'get the latest post from Reddit',
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch(
    // nba subreddit https://www.reddit.com/r/nba/.json
    'https://www.reddit.com/r/ProgrammerHumor/top.json?sort=top&t=day'
  ).then((res) => res.json())

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
