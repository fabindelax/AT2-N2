const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.listBooks);

router.post('/buy/:titulo', booksController.buyBook);

router.post('/', booksController.addBook);

module.exports = router;
