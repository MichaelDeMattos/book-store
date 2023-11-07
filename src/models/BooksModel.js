const { DataTypes } = require('sequelize');
const db = require('../config');

const Book = db.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        indexes: [
            {
                unique: true,
                fields: ['title', 'author']
            }
        ]
    });

module.exports = Book;
