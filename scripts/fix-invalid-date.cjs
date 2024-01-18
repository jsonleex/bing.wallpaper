const { writeFile } = require('node:fs/promises')
const { glob } = require('fast-glob')

async function main() {
  const files = await glob(
    './archive/**/NaNNaNNaN.json',
    {
      absolute: true,
    },
  )

  for (const file of files) {
    const data = require(file)

    data.url = data.url.replace('https:/ww', 'https://ww')
    data.date = data.date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')

    const date = new Date(data.date)
    const YYYY = String(date.getFullYear())
    const MM = String(date.getMonth() + 1).padStart(2, '0')
    const DD = String(date.getDate()).padStart(2, '0')

    await writeFile(
      file.replace('NaNNaN/NaNNaNNaN.json', `${YYYY}${MM}/${YYYY}${MM}${DD}.json`),
      JSON.stringify(data, null, 2),
      'utf-8',
    )
  }
}

main().catch((error) => {
  console.error(error)
})
