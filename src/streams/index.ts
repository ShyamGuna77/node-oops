


import { promises as fs } from 'fs'
import { gzip } from 'zlib'
import { promisify } from 'util'
const gzipPromise = promisify(gzip)
const filename = process.argv[2]
async function main () {
 if (!filename) {
  console.error('Usage: node index.js <filePath>')
  process.exit(1)
 }
 const data = await fs.readFile(filename)
 const gzippedData = await gzipPromise(data)
 await fs.writeFile(`${filename}.gz`, gzippedData)
 console.log('File successfully compressed')
}
main().catch(err => {
 console.error('Error during file compression:', err)
})