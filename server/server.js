const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
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
app.get('/book/:id', (req, res) => {
var id = req.params.id;

if (!ObjectID.isValid(id)) {
return res.status(404).send();
}

Book.findById(id).then((book) => {

res.send({ book });
}).catch((e) => {
res.status(400).send();
});
});

//delete book 
app.delete('/book/:id', (req, res) => {
const deleteBookId = req.params.id;
console.log('ID ==> ', deleteBookId);

if (!ObjectID.isValid(deleteBookId)) {
console.log('not found!!');
return res.status(404).send();
}

Book.findOneAndDelete(deleteBookId).exec().then(() => {
return res.json('Book Deleted Successfully!');
}).catch(error => {
console.log('Error:: ', error);
});

});

//update Book
app.put('/book/:id', (req, res) => {

    const bookId = req.params.id;
    const { status, name, author } = req.body;

    if (!ObjectID.isValid(bookId)) {
        console.log('not found!!');
        return res.status(404).send();
    }

    Book.findOneAndUpdate(bookId, { status, name, author })
    .then(doc => {
        console.log(doc)
        if(doc) 
            return res.json('Book sucessfully updated')
    })
    .catch(err => console.error(err));
});

// delete user
app.delete('/users/:id', (req, res) => {
const deleteUserId = req.params.id;
console.log('ID ==> ', deleteUserId);

if (!ObjectID.isValid(deleteUserId)) {
console.log('not found!!');
return res.status(404).send();
}

User.findOneAndDelete(deleteUserId).exec().then(() => {
return res.json('Book Deleted Successfully!');
}).catch(error => {
console.log('Error:: ', error);
});

});

//taskkill /F /PID pid_number
// app.delete('/books/:id', (req, res) => {
//     var id = req.params.id;

//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send();
//     }

//     Book.findByIdAndRemove
// });

//   newBook.save().then((doc)=> {
//         console.log('Saved Todo', doc);
//      }, (e) => {
//          console.log('Unable to save Todo');
//      });




app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};