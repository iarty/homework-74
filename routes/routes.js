const { Router } = require("express");
const router = Router();
const fs = require("fs");

const path = "./messages/";

router.get("/", (req, res) => {
  res.redirect("/messages");
});

router.post("/messages", (req, res) => {
  const date = new Date().toLocaleString();
  const fileName = `./messages/${date}.txt`;
  fs.writeFile(fileName, JSON.stringify({ ...req.body, date }), err => {
    if (err) {
      res.send(err);
    }
  });
  res.send({ ...req.body, datetime: date });
});

router.get("/messages", (req, res) => {
  fs.readdir(path, async (err, files) => {
    const resolve = files
      .slice(-5)
      .map(fileName => JSON.parse(fs.readFileSync(path + fileName)));
    res.send(resolve);
  });
});

module.exports = router;
