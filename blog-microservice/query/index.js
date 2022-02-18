const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// store posts details ( comments, id, status etc)
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

// send all post details from query service
app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

// post event sent from event-bus
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.status(200).send({});
});

// server
app.listen(4002, async () => {
  console.log("Listening on PORT:4002");
  const res = await axios
    .get("http://event-bus-service:8000/events")
    .catch((err) => console.log("Fetch Events error : ", err.message));

  for (let event of res.data) {
    console.log("Processing event : ", event.type);
    handleEvent(event.type, event.data);
  }
});
