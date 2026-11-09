const http = require("http");
const fs = require("fs");
const { getProductCount } = require("./utils");

// Читаем все JSON файлы при запуске
const roomsData = fs.readFileSync("./data/products.json", "utf-8");
const guestsData = fs.readFileSync("./data/guests.json", "utf-8");
const reservationsData = fs.readFileSync("./data/reservations.json", "utf-8");

const rooms = JSON.parse(roomsData);
const guests = JSON.parse(guestsData);
const reservations = JSON.parse(reservationsData);

console.log("Количество номеров:", getProductCount(rooms));

const server = http.createServer((req, res) => {
    
    // === 1. Главная страница (Красивое меню) ===
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Отель Pravotorik API</title>
                <style>
                    body { font-family: sans-serif; background: #fffafb; color: #2a1a2e; padding: 40px; }
                    h1 { color: #E91E63; }
                    ul { list-style: none; padding: 0; }
                    li { background: #fff; margin-bottom: 10px; padding: 15px; border-radius: 8px; box-shadow: 0 4px 12px rgba(233,30,99,0.1); }
                    a { text-decoration: none; color: #E91E63; font-weight: bold; }
                    a:hover { color: #ad0f4a; }
                </style>
            </head>
            <body>
                <h1>Добро пожаловать в API Отеля Pravotorik</h1>
                <p>Доступные маршруты:</p>
                <ul>
                    <li><a href="/api/rooms">/api/rooms</a> — Список всех номеров</li>
                    <li><a href="/api/guests">/api/guests</a> — Список гостей отеля</li>
                    <li><a href="/api/reservations">/api/reservations</a> — Список активных броней</li>
                    <li><a href="/api/info">/api/info</a> — Информация о сервере</li>
                </ul>
            </body>
            </html>
        `);
        return;
    }

    // === 2. API Номеров ===
    if (req.method === "GET" && req.url === "/api/rooms") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(rooms));
        return;
    }

    // === 3. API Гостей ===
    if (req.method === "GET" && req.url === "/api/guests") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(guests));
        return;
    }

    // === 4. API Броней ===
    if (req.method === "GET" && req.url === "/api/reservations") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(reservations));
        return;
    }

    // === 5. Информация о сервере ===
    if (req.method === "GET" && req.url === "/api/info") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({
            app: "Hotel API",
            version: "1.0",
            author: "Pravotorova Anastasia",
            tech: "Node.js without Express"
        }));
        return;
    }

    // === 6. Обработка 404 ===
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Маршрут не найден", code: 404 }));
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
    console.log(`Сервер запущен на порту ${port}`);
    console.log(`Открой в браузере: http://localhost:${port}`);
});