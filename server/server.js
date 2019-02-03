var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var {Book} = require('./models/book');
//var {newBook}= require('./models/book');
var {newBooks}= require('./models/book');
var {User} = require('./models/user');
//const authRoutes = require('./routes/auth');

var app = express();

app.use(bodyParser.json());

//app.use('/auth', authRoutes);

//To add a user
app.post('/users', (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

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

        Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        });
    });

//   newBook.save().then((doc)=> {
//         console.log('Saved Todo', doc);
//      }, (e) => {
//          console.log('Unable to save Todo');
//      });




app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app};