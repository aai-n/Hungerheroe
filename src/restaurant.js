const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database("./food_donations.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create table if not exists
db.run(
    `CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_name TEXT,
        food_details TEXT,
        location TEXT
    )`
);

// API endpoint to add a food donation
app.post("/add-donation", (req, res) => {
    const { restaurant_name, food_details, location } = req.body;
    if (!restaurant_name || !food_details || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = INSERT INTO donations (restaurant_name, food_details, location) VALUES (?, ?, ?);
    db.run(query, [restaurant_name, food_details, location], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ id: this.lastID, restaurant_name, food_details, location });
    });
});

// API endpoint to fetch all donations
app.get("/get-donations", (req, res) => {
    db.all("SELECT * FROM donations", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});


const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database("./food_donations.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create table if not exists
db.run(
    `CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_name TEXT,
        food_details TEXT,
        location TEXT
    )`
);

// API endpoint to add a food donation
app.post("/add-donation", (req, res) => {
    const { restaurant_name, food_details, location } = req.body;
    if (!restaurant_name || !food_details || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = INSERT INTO donations (restaurant_name, food_details, location) VALUES (?, ?, ?);
    db.run(query, [restaurant_name, food_details, location], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ id: this.lastID, restaurant_name, food_details, location });
    });
});

// API endpoint to fetch all donations
app.get("/get-donations", (req, res) => {
    db.all("SELECT * FROM donations", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});
