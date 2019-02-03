const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {bookSchema} = require('./../models/book');

beforeEach((done) => {
    bookSchema.remove({}).then(() => done());
});

describe('POST /books', () => {
  it('should create a new book', (done) => {
    var bookSchema = 'Test book text';

    request(app)
      .post('/books')
      .send({bookSchema})
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(title);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        bookSchema.find().then((bookSchema) => {
          expect(bookSchema.length).toBe(1);
          expect(bookSchema[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

//   it('should not create a book with invalid body data', (done) => {
//     request(app)
//       .post('/books')
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Book.find().then((books) => {
//           expect(books.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
});
