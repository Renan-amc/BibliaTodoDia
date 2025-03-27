//Express Setup
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

//Mongoose Setup
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://renancwork:Q9fWB25G6NB2tFA3@bibliatododia.bwgbghh.mongodb.net/?retryWrites=true&w=majority&appName=BibliaTodoDia');
}

//Criando um Model e o {} seria o schema que eu crio na hora - mongoose
const BibleScholar = mongoose.model('BibleScholar', {
    name: String,
    age: Number,
    passage: [{Chapter: String, Verse: Number}]
});

//Fazendo requisição com express 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async (req, res) => {
    const bibleScholar = new BibleScholar({
        name: req.body.name,
        passage: [{Chapter: req.body.chapter, Verse: req.body.verse}]
    })

    await bibleScholar.save();
    res.send(bibleScholar);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})