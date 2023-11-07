const { Router } = require('express');
const Book = require('../models/BooksModel');
const books_api = new Router();

// Get book by specific :id
books_api.get('/api/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({
                'response': '404 Not Found',
                'status': 400
            });
        }
        return res.status(404).json({
            'response': `200 OK`,
            'status': 200
        })
    } catch (error) {
        return res.status(503).json({
            'response': error.message,
            'status': 503
        });
    }
});

// Get all book's with pagination
books_api.get('/api/books', async (req, res) => {
    try {
        const page = req.params.id | 1;
        const rowsPerPage = req.params.rowsPerPage | 20;
        if (!page || !rowsPerPage) {
            return res.status(400).json({
                'response': '400',
                'status': 400
            });
        }
        return res.status(200).json({
            'response': `200 OK`,
            'status': 200
        })
    } catch (error) {
        return res.status(503).json({
            'response': error.message,
            'status': 503
        });
    }
});

// Create new Book
books_api.post('/api/books', async (req, res) => {
    try {
        const { bookTitle, author } = req.body;
        if (!bookTitle || !author) {
            return res.status(400).json({
                'response': '400 - Invalid body params!!!',
                'status': 400
            });
        }
        try {
            const alreadyThisBook = await Book.findOne({
                where: {
                    author: author,
                    title: bookTitle
                }
            });
            if (alreadyThisBook) {
                return res.status(422).json({
                    'response': '422 - already book title for this author!!!',
                    'status': 422
                });
            }
            const newBook = await Book.create({ title: bookTitle, author: author });
            return res.status(201).json({
                'response': newBook,
                'status': 201
            });
        } catch (error) {
            console.log(error.message);
            return res.status(422).json({
                'response': '422 - error on create new book!!!',
                'status': 422
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(503).json({
            'response': error.message,
            'status': 503
        });
    }
});

// Put request
books_api.put('/api/books', async (req, res) => {
    try {
        return res.status(200).json({
            'response': `200 OK`,
            'status': 200
        })
    } catch (error) {
        return res.status(503).json({
            'response': error.message,
            'status': 503
        });
    }
});

// Delete request
books_api.delete('/api/books', async (req, res) => {
    try {
        return res.status(200).json({
            'response': `200 OK`,
            'status': 200
        })
    } catch (error) {
        return res.status(503).json({
            'response': error.message,
            'status': 503
        });
    }
});

module.exports = books_api;
