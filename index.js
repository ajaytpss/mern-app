import express from "express";
import { dbConnection } from "./databaseConn.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to huntingcoder!");
});

const findBlogs = async () => {
  const collection = await dbConnection();
  const result = await collection.find().toArray();
  return result;
};

app.get("/blogs", async (req, res) => {
  const data = await findBlogs();
  res.send(data);
});

const findBlog = async (slug) => {
  const collection = await dbConnection();
  const result = await collection.find({ title: slug }).toArray();
  return result;
};
app.get("/blog", async (req, res) => {
  const slug = req.query.slug.split("-").join(" ");
  const data = await findBlog(slug);
  res.send(data);
});

const addBlog = async (data) => {
  const db = await dbConnection();
  const result = db.insertOne(data);
  return result;
};
app.post("/addblog", (req, res) => {
  let newDocument = req.body;
  addBlog(newDocument);
  res.send(newDocument);
});

app.listen(5000);
