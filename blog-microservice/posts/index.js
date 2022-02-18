const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");
const axios = require("axios");

// express app configuration
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fake DB for posts
const posts = {};

// get all posts
app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

// add new post to DB and trigger create-post event to event bus
app.post("/posts/create", async (req, res) => {
  const id = nanoid();
  const { title } = req.body;

  // store new post
  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://event-bus-service:8000/events", {
      type: "PostCreated",
      data: { id, title },
    })
    .catch((err) => console.log(err.message));

  res.status(200).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event ", req.body);

  res.send({});
});

// server
app.listen(4000, () => console.log("Server running on PORT:4000"));
