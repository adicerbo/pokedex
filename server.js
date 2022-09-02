const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const methodOverride = require("method-override");

const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log("yooooo");
    next();
  });

// "id": 000
// "name": pokemon name
// "img": image
// "type": ["normal", "etc"]
// "stats": {
// // "hp": xx,
// // "attack": xx,
// // "defense": xx
// }



// INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', { 
        data: Pokemon 
    });
});


// NEW
app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/", (req, res) => {
    Pokemon.unshift(req.body)
    res.redirect("/")
});


// SHOW
app.get('/:id', (req, res) => {
    res.render('show.ejs', {
        data: Pokemon[req.params.id]
    });
});


// DELETE
app.delete("/:id", (req, res) => {
    Pokemon.splice(req.params.id, 1);
    res.redirect("/");
});

// EDIT
app.get("/:id/edit", (req, res) => {
    res.render(
        "edit.ejs",
        {
            data: Pokemon[req.params.id],
            id: [req.params.id],
        }
    );
});

// UPDATE
app.put("/:id", (req, res) => {
    Pokemon[req.params.id] = req.body
    res.redirect("/" +req.params.id);
});


app.listen(port, () => {
    console.log("hi");
});