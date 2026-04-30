const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для розбору JSON
app.use(express.json());

// Роздаємо статичні файли (index.html)
app.use(express.static(path.join(__dirname)));

// Обробник POST-запиту для обчислення квадрата
app.post('/api/square', (req, res) => {
    const { number } = req.body;

    // Перевірка, чи передано число
    if (number === undefined || typeof number !== 'number' || isNaN(number)) {
        return res.status(400).json({ error: 'Необхідно передати числове поле "number"' });
    }

    const square = number * number;
    res.json({ number, square });
});

// Всі інші GET-запити віддають index.html (для підтримки маршрутизації)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
    console.log('Натисніть Ctrl+C для зупинки');
});