const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");
const date = new Date().toLocaleString();
const fileName = `./${date}`;

app.use(express.json());

app.post("/messages", (req, res) => {
  fs.writeFileSync(fileName, JSON.stringify(req.body), err => {
    if (err) {
      console.error(err);
    }
    console.log("File was saved!");
  });
  res.send({ ...req.body, datetime: date });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
