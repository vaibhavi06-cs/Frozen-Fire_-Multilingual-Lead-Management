const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const franc = require("franc");
const translate = require("@vitalets/google-translate-api");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@123", // <-- apna password
  database: "lead_management"
});

db.connect(err => {
  if (err) console.log("DB connection failed ❌", err);
  else console.log("Connected to MySQL ✅");
});

// Language map
const langMap = {
  eng: "English",
  hin: "Hindi",
  mar: "Marathi",
  guj: "Gujarati",
  tam: "Tamil",
  tel: "Telugu",
  spa: "Spanish",
  fra: "French",
  deu: "German"
};

// Add lead with safe detection & translation
app.post("/api/leads", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Language detection safe
  let detectedCode = franc(message, { minLength: 3 });
  let language = langMap[detectedCode] || "Unknown";

  // Translation safe
  let translatedMessage = message; // default original
  try {
    const translationResult = await translate(message, { to: "en" });
    translatedMessage = translationResult.text;
  } catch (err) {
    console.log("Translation failed, using original message");
  }

  // Insert into DB
  const sql = `
    INSERT INTO leads (name, email, phone, language, message, translated_message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, email, phone, language, message, translatedMessage], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    res.json({
      message: "Lead added successfully ✅",
      translatedMessage
    });
  });
});

// Get all leads
app.get("/api/leads", (req, res) => {
  db.query("SELECT * FROM leads ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
