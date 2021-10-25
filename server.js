const express = require('express')   
const app = express()  
const MongoClient = require('mongodb').MongoClient  

var db, collection;  

const url = 'Add DB string'// DataBase url
const dbName = "recipe";   //Data base name.


//Conecting to data base
app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});


//Middle wares 
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//Serving Files
app.get('/', (req, res) => {
  db.collection('recipes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { recipes: result })
  })
})

app.get('/new', (req, res) => {
  db.collection('recipes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('new.ejs')
  })
})
 
app.post('/save', (req, res) => {
  db.collection('recipes').insertOne({ name: req.body.name, msg: req.body.msg }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/delete', (req, res) => {
  db.collection('recipes').findOneAndDelete({ name: req.body.name, id: req.body._id }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
