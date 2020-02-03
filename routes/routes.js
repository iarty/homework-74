const { Router } = require("express");
const router = Router();
const fs = require("fs");

const path = "./messages";

router.get("/", (req, res) => {
  res.redirect("/messages");
});

const sendData = arr => {
  return new Promise(resolve => {
    const newArr = [];
    arr.slice(-5).forEach(fileName => {
      fs.readFile(`${path}/${fileName}`, (err, data) => {
        newArr.push(JSON.parse(data));
        if (newArr.length === 5) {
          return resolve(newArr);
        }
      });
    });
  });
};

router.post("/messages", (req, res) => {
  const date = new Date().toLocaleString();
  const fileName = `./messages/${date}.txt`;
  fs.writeFile(fileName, JSON.stringify(req.body), err => {
    if (err) {
      res.send(err);
    }
  });
  res.send({ ...req.body, datetime: date });
});

router.get("/messages", (req, res) => {
  const arr = [];
  fs.readdir(path, async (err, files) => {
    files.forEach(file => {
      arr.push(file);
    });
    res.send(await sendData(arr));
  });
});

module.exports = router;
