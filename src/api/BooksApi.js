const { Router } = require('express');
const Book = require('../models/BooksModel');
const { getLastPagem, getNextPage, getLastPage } = require('../utils/Utils');
const books_api = new Router();

// Get book by specific :id
books_api.get('/api/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({
                'response': '400 - Invalid request params!!!',
                'status': 400
            });
        }
        const book = await Book.findOne({
            where: {
                id: bookId
            }
        });
        if (!book) {
            return res.status(404).json({
                'response': '404 Book not found',
                'status': 404
            });
        }
        return res.status(200).json({
            'response': book,
            'status': 200
        })
    } catch (error) {
        console.log(error.message);
        return res.status(503).json({
            'response': error.message,
            'status': 503
        });
    }
});

// Get all book's with pagination
books_api.get('/api/books', async (req, res) => {
    try {
        let { page, rowsPerPage } = req.query;
        page = parseInt(page, 10);
        rowsPerPage = parseInt(rowsPerPage, 10);
        const offSet = (page - 1) * rowsPerPage;
        const totalRecords = await Book.count();
        const lastPage = await getLastPage(totalRecords, rowsPerPage);
        const nextPage = await getNextPage(page, lastPage);
        const books = await Book.findAll({
            limit: rowsPerPage,
            offset: offSet
        });
        return res.status(200).json({
            'pagination': {
                'page': page,
                'next': nextPage,
                'last': lastPage
            },
            'total_records': totalRecords,
            'response': books,
            'status': 200
        })
    } catch (error) {
        console.log(error.message);
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
        const { id, bookTitle, author } = req.body;
        if (!id || !bookTitle || !author) {
            return res.status(400).json({
                'response': '400 - Invalid body params!!!',
                'status': 400
            });
        }
        const [updatedRowsCount] = await Book.update(
            { title: bookTitle, author: author },
            { where: { id: parseInt(id, 10) } });
        if (updatedRowsCount === 1) {
            return res.status(200).json({
                'response': 'Book updated successfully',
                'status': 200
            });
        } else {
            return res.status(404).json({
                'response': '404 Book not found',
                'status': 404
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

// Delete request
books_api.delete('/api/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({
                'response': '400 - Invalid request params!!!',
                'status': 400
            });
        }
        const deletedBook = await Book.destroy({
            where: {
                id: bookId
            }
        });
        if (deletedBook) {
            return res.status(204).json({
                'response': '204 - No Content',
                'status': 204
            });
        } else {
            return res.status(404).json({
                'response': '404 Book not found',
                'status': 404
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

module.exports = books_api;
