const { Router } = require("express");
const books_api = new Router();

// Get request
books_api.get('/api/books', async (req, res) => {
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

// Post request
books_api.post('/api/books', async (req, res) => {
    try {
        return res.status(201).json({
            'response': `201 Created`,
            'status': 201
        })
    } catch (error) {
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
