// require the Express module
const express = require("express");

//creates a new router object
const todoRoutes = express.Router();
const pool = require("./connection")

const items = [];

todoRoutes.get("/todo-items", (req, res) => {
  pool.query("SELECT * FROM todos").then(result => {
    console.log(result.rows)
    res.json(result.rows);
  })
  // .json sends response as JSON
  // res.status(200).json(items); //note: defaults to 200 if request has succeeded.
});

// // route
// cartRoutes.get("/cart-items/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   // Find by ID
//   const item = items.find(item => item.id === id);
//   if (item) {
//     res.status(200).json(item)
//   } else {
//     // Set response code to 404
//     res.status(404);
//     res.send(`ID ${id} Not Found`);
//   }
// });

// // route
todoRoutes.post("/todo-items", (req, res) => {
  pool.query("INSERT INTO todos (task, completed) VALUES ($1::text, $2::boolean)",
    [req.body.task, req.body.completed]).then(() => {
      res.json(req.body)
    })
});

// route
todoRoutes.put("/cart-items/:id", (req, res) => {
  pool.query("UPDATE todos SET $1::boolean WHERE id=$2::int", [req.body.completed, req.params.id]).then(() => {
    res.json(req.body)
  })
});

// route
todoRoutes.delete("/todo-items/:id", (req, res) => {
  pool.query("DELETE FROM todos WHERE id=$1::int", [req.params.id]).then(() => {
    res.status(200).json(`${req.params.id}`);
  })
});

module.exports = { todoRoutes };
