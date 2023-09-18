import { Template, generate, checkTemplate } from '@pdfme/generator'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const templateJsonString = readFileSync('./template.json', 'utf8')
const font = {
  'NotoSerifJP-Regular': {
    data: readFileSync('public/fonts/NotoSerifJP-Regular.otf'),
    fallback: true
  },
  'NotoSansJP-Regular': {
    data: readFileSync('public/fonts/NotoSansJP-Regular.otf')
  },
  'NotoSansSC-Regular': {
    data: readFileSync('public/fonts/NotoSansSC-Regular.otf')
  },
  'ZenKurenaido-Regular': {
    data: readFileSync('public/fonts/ZenKurenaido-Regular.ttf')
  }
}

try {
  const templateJson = JSON.parse(templateJsonString)
  checkTemplate(templateJson)
  const template = templateJson
  generate({
    template,
    inputs: [
      {
        name: 'Henry Bui', // NotoSansJP-Regular
        age: 'English 中国产品', // NotoSansSC-Regular
        sex: 'Male', // ZenKurenaido-Regular
        owner: 'https://pdfme.com/'
      }
    ],
    options: { font }
  }).then((pdf) => {
    writeFileSync(join(__dirname, 'generated.pdf'), pdf)
    console.info('Done!')
  })
} catch (e) {
  console.error(e)
}
