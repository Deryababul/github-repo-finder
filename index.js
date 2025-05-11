const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/repos", async (req, res) => {
  const username = req.body.username;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    res.render("repos", { repos: response.data, username });
  } catch (err) {
    res.send("Kullanıcı bulunamadı veya GitHub API hatası.");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT} üzerinden çalışıyor.`));
