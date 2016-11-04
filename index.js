const electronDocs = require('electron-docs')
const marky = require('marky-markdown-lite')
const natural = require('natural')
const htmlToText = require('html-to-text').fromString
tfidf = new natural.TfIdf()
const Table = require('cli-table')
const table = new Table({head: ['Word', 'Score']})

electronDocs().then(docs => {
  docs.forEach(doc => {
    const text = htmlToText(marky(doc.markdown_content).html())
    tfidf.addDocument(text)
  })

  tfidf.listTerms(0).forEach(item => {
    table.push([item.term, item.tfidf])
  })

  console.log(table.toString())
})
