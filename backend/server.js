const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const franc = require("franc");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@123",   // <-- apna password
  database: "lead_management"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌", err);
  } else {
    console.log("Connected to MySQL Database ✅");
  }
});

// Language Mapping
const langMap = {
  eng: "English",
  hin: "Hindi",
  mar: "Marathi",
  guj: "Gujarati",
  tam: "Tamil",
  tel: "Telugu"
};

// Home Route
app.get("/", (req, res) => {
  res.send("Smart Multilingual Backend Running 🚀");
});

// Add Lead with Auto Language Detection
app.post("/api/leads", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const detectedCode = franc(message);
  const detectedLanguage = langMap[detectedCode] || "Unknown";

  const sql = `
    INSERT INTO leads (name, email, phone, message, language)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, message, detectedLanguage],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Lead added successfully ✅",
        detectedLanguage: detectedLanguage
      });
    }
  );
});

// Get All Leads
app.get("/api/leads", (req, res) => {
  db.query("SELECT * FROM leads", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
