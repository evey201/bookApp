var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var {Book} = require('./models/book');
//var {newBook}= require('./models/book');
var {newBooks}= require('./models/book');
var {User} = require('./models/user');
const authRoutes = require('../routes/auth');

var app = express();
var port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(authRoutes);

app.get('/', (req, res)=>{
    res.send('App is working')
})

//To post a new book to the database
app.post('/books', (req, res) => {
    var book = new Book({
        name: req.body.name,
        author: req.body.author,
        rating: req.body.rating
    });

    book.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
  
  
});  
// To fetch a book with its ratings from the database
  app.get('/books', (req, res) => {
    Book.find().then((book) => {
            res.send({book});
      }, (e) => {
        res.status(400).send(e);
      });

  });


  //To fetch by unique id
    app.get('/books/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Book.findById(id).then((book) => {
            if (!book) {
                return res.status(404).send();
            }

            res.send({ book });
        }).catch((e) => {
            res.status(400).send();
        });
    });

//   newBook.save().then((doc)=> {
//         console.log('Saved Todo', doc);
//      }, (e) => {
//          console.log('Unable to save Todo');
//      });




app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {app};