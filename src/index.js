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
const Passages = mongoose.model('Passages',{
  passage: String,
  chapter: Number,
  verse: Number,
  description: String
})

const User = mongoose.model('User',{
  name: { type: String, required: true },
  passages: [{ type:mongoose.Schema.Types.ObjectId, ref:'Passages' }]
});


//Fazendo requisição com express 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Adicionar usuario
app.post('/', async (req, res) => {
    const passagesData = req.body.passages.map(passageData => {
      return new Passages({
        passage: passageData.passage,
        chapter: passageData.chapter,
        verse: passageData.verse,
        description: passageData.description
      });
    });

    const savedPassages = await Passages.insertMany(passagesData);
    
    const user = new User({
      name: req.body.name,
      passages: savedPassages.map(p => p._id)
  });

    await user.save();
    res.send(user);
})


app.listen(port, () => {
  console.log("Funcionando!")
})