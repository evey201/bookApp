var mongoose = require('mongoose');

var Book = mongoose.model('Book', {
    name: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    author: {
        type: String,
        trim: true
    },
    rating: {
        type: Number
    },
    // completed: {
    //     default: true
    // }
});

// var newBook = new Book({
//         text:  'Aer the Gods to blame',
//         author: 'Folu',
//         rating: 3
// });



module.exports = {
    Book
   // newBook,
};
    // var Schema = mongoose.Schema;
    
    // var bookSchema = new Schema({
    //   title:  String,
    //   author: String,
      
    //   //comments: [{ body: String, date: Date }],
    //   date: { type: Date, default: Date.now },
    //   hidden: Boolean,
    //   meta: {
    //     ratings: Number,
    //     //favs:  Number
    //   }
    // });