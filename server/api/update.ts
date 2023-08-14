import { BingImage } from "@/types/bing"
import { buildStorageKey } from "../utils/bing"
import { commitFilesToGithub } from "../utils/github"

const locations = [
  "de-DE",
  "en-CA",
  "en-GB",
  "en-IN",
  "en-US",
  "fr-FR",
  "it-IT",
  "ja-JP",
  "zh-CN"
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { commit: boolean }
  const commit = Boolean(query.commit) || false

  const updates: [string, BingImage][] = []

  const key = buildStorageKey(new Date())
  const storage = useStorage('archive')

  for (const mkt of locations) {
    if (await storage.hasItem(`${mkt}/${key}`)) {
      console.log(`Already updated for ${mkt}`)
      continue
    }

    const [image] = await fetchBingImages({ n: 1, idx: 0, mkt })

    if (!image) {
      console.log(`No image update for ${mkt}`)
      continue
    }

    updates.push([buildStorageKey(new Date(image.date), mkt), image])
  }

  if (commit && updates.length) {
    try {
      const files = updates.map(([filename, data]) => ({
        filename,
        content: JSON.stringify(data, null, 2)
      }))

      await commitFilesToGithub(files, 'chore: daily update [skip deploy]')
    } catch (error) {
      console.error('Commit error:', error)
    }
  }

  return updates
})

