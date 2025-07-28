import fg from 'fast-glob'
import { writeFile } from 'node:fs/promises'

async function main(params) {
  const groups = {}
  const files = await fg(`./archive/**/????????.json`, { absolute: true })

  for (const filename of files) {
    const groupname = filename.replace(/\/\d{8}\.json$/, '.json')

    if (!groups[groupname])
      groups[groupname] = {}

    const { default: data } = await import(filename, { with: { type: 'json' } })
    groups[groupname][String(data.date).replaceAll('-', '')] = data
  }

  for (const [groupfile, data] of Object.entries(groups)) {
    await writeFile(groupfile, JSON.stringify(data, null, 2), { encoding: 'utf-8', flag: 'w' })
  }
}

main().catch((error) => {
  console.error(error)
})