import { existsSync, writeFileSync, readFileSync } from 'node:fs'
import http from 'node:http'
import https from 'node:https'
import { argv, exit, env } from 'node:process'

const idx = argv[2] || 0
const api_endpoint = (env.API_ENDPOINT || '').replace(/\/$/, '')

if (!api_endpoint) {
  console.error('? Missing API_ENDPOINT env variable')
  exit(1)
}

console.log(`* Fetching updates from ${api_endpoint}`)
const request = api_endpoint.startsWith('http://') ? http : https

request.get(
  `${api_endpoint}/api/updates?idx=${idx}`,
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
    response.on('data', (chunk) => {
      raw += chunk
    })
    response.on('end', () => {
      try {
        updateFiles(JSON.parse(raw))
      }
      catch (e) {
        console.error(e.message)
      }
    })
  },
).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})

function updateFiles(updates) {
  console.log(`# applying ${updates.length} updates at ${new Date().toISOString()}`)

  for (const update of updates) {
    const { lang, ...data } = update

    const key = data.date.replaceAll('-', '')
    const filepath = `archive/${lang}/${key.slice(0, 6)}.json`

    const group = existsSync(filepath)
      ? JSON.parse(readFileSync(filepath, 'utf-8'))
      : {}

    console.log()
    console.log(`- updating ${lang.toLowerCase()}...`)
    if (group[key]) {
      console.warn(`! ${key} already exists`)
    }
    else {
      group[key] = data
      console.log(`+ ${key} added`)
      writeFileSync(filepath, JSON.stringify(group, null, 2), 'utf-8')
      console.log(`+ updated ${filepath}`)
    }
  }
}
