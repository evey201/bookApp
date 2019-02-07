const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
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
    status: {
        type: String,
        default: "New entry"
    }
},
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema, 'books');
module.exports = { Book };

// // var newBook = new Book({
// //         text:  'Aer the Gods to blame',
// //         author: 'Folu',
// //         rating: 3
// // });



// module.exports = {
//     Book
//    // newBook,
// };
//     // var Schema = mongoose.Schema;
    
//     // var bookSchema = new Schema({
//     //   title:  String,
//     //   author: String,
      
//     //   //comments: [{ body: String, date: Date }],
//     //   date: { type: Date, default: Date.now },
//     //   hidden: Boolean,
//     //   meta: {
//     //     ratings: Number,
//     //     //favs:  Number
//     //   }
//     // });