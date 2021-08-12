const app = require("express");
var router = app.Router();
const path = require("path");
const fs = require('fs');

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let notes = JSON.parse(data);
    notes.forEach((note, id) => {
      note.id = id++;
    });
    return res.send(notes);
  });
});
router.post("/api/notes", async (req, res) => {
  await fs.readFile("./db/db.json", "utf8", async (err, data) => {
    if (err) {
      throw err;
    }
    let database;
    if (data != undefined) {
      database = JSON.parse(data);
    } else {
      database = [];
    }
    let newNote = {
      id: `${database.length}`,
      title: `${req.body.title}`,
      text: `${req.body.text}`,
    };

    database.push(newNote);
    let db = JSON.stringify(database, null, 1);

    await fs.writeFile("./db/db.json", db, (err, data) => {
      if (err) {
        throw err;
      }
      console.log("Note added");
      return res.send(newNote);
    });
  });
});

// router.delete('/api/notes:id', async (req, res) => {
//   await fs.readFile("./db/db.json", "utf8", async (err, data) => {
//     if (err) {
//       throw err;
//     };
//     let database = JSON.parse(data);
//     let del = req.params.id

//     database.splice(del, 1);
//     let db = JSON.stringify(database, null, 1);

//     await fs.writeFile("./db/db.json", db, (err, data) => {
//       if (err) {
//         throw err;
//       }
//       console.log("Note deleted");
//       return res.send("Note deleted");
//     });
//   });
// });

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

module.exports = router;
