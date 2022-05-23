
// const { db } = require("../../db/db.json");
const router = require("express").Router();
const fs = require("fs");

const savedNotes = fs.readFileSync("./db/db.json", "UTF-8");
if (savedNotes) {
  let oldNotes = JSON.parse(savedNotes);
  notes = oldNotes;
} else {
  notes = [];
}

router.get("/notes", (req, res) => {
    return res.json(notes);
  });

router.post("/notes", function (req, res) {
  let createNote = {
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(createNote);
  res.json(createNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (
    err
  ) {
    if (err) throw err;
  });
});

module.exports = router;