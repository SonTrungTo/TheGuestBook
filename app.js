const express = require("express");
const {createServer} = require("http");
const {urlencoded} = require("body-parser");
const logger = require("morgan");
const {resolve} = require("path");

const app = express();

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

const entries = [];
app.locals.entries = entries;

app.use(urlencoded({extended: false}));

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/add-entry", (request, response) => {
  response.render("add-entry");
});

app.post("/add-entry", (request, response) => {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    body: request.body.body,
    published: new Date()
  });
  response.redirect("/");
});

app.use((request, response) => {
  response.status(404).render("404");
});

createServer(app).listen(process.env.PORT, () => {
  console.log("Guestbook app started on port 3000.");
});
