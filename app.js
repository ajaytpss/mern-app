import express from "express";
const app = express();

const pageAccess = (req, res, next) => {
  const age = req?.query.age;
  if (!age) {
    res.send("Please enter age!");
  } else if (age < 18) {
    res.send("You are under age!");
  } else {
    next();
  }
};

app.use(pageAccess);

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/users", (req, res) => {
  res.send("Welcome to users");
});

app.get("/blogs", (req, res) => {
  res.send("Welcome to blogs");
});

app.listen(5000);
