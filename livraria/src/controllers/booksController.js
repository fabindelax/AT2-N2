const fs = require('fs');
const path = require('path');
const booksFilePath = path.join(__dirname, '../../data/books.json');

const readBooksFile = () => {
    const data = fs.readFileSync(booksFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeBooksFile = (data) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

exports.listBooks = (req, res) => {
    const books = readBooksFile();
    res.json(books);
};

exports.buyBook = (req, res) => {
    const books = readBooksFile();
    const { titulo } = req.params;

    const bookIndex = books.findIndex(book => book.titulo === titulo);
    if (bookIndex !== -1 && books[bookIndex].numExemplares > 0) {
        books[bookIndex].numExemplares -= 1;
        writeBooksFile(books);
        res.status(200).json({ message: 'Compra realizada com sucesso!' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado ou sem exemplares disponíveis.' });
    }
};

exports.addBook = (req, res) => {
    const books = readBooksFile();
    const newBook = req.body;

    books.push(newBook);
    writeBooksFile(books);

    res.status(201).json({ message: 'Livro cadastrado com sucesso!' });
};
