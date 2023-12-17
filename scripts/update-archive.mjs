import https from 'node:https'
import { dirname } from 'node:path'
import { argv } from 'node:process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

const idx = argv[2] || 0

https.get(
  `https://wallpaper.leex.vercel.app/api/updates?idx=${idx}`,
  (response) => {
    const statusCode = response.statusCode
    const contentType = response.headers['content-type']

    let error

    if (statusCode !== 200) {
      error = new Error('Request Failed.\n'
      + `Status Code: ${statusCode}`)
    }
    else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n'
      + `Expected application/json but received ${contentType}`)
    }

    if (error) {
      console.error(error.message)
      response.resume()
      return
    }

    response.setEncoding('utf8')
    let raw = ''
    response.on('data', (chunk) => { raw += chunk })
    response.on('end', () => {
      try {
        createFiles(JSON.parse(raw))
      }
      catch (e) {
        console.error(e.message)
      }
    })
  },
).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})

function createFiles(files) {
  // writeFileSync(`archive/updated_at`, new Date().toISOString())
  for (const [filename, data] of files) {
    const filepath = `archive/${filename}`

    const dir = dirname(filepath)
    if (!existsSync(dir))
      mkdirSync(dir, { recursive: true })

    writeFileSync(filepath, JSON.stringify(data, null, 2))
  }
}
