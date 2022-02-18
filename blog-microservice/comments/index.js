const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");
const axios = require("axios");

// app configs
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fake db for comments
const commentsByPostId = {};

// get all comments by post id
app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

// store new comment and send create-comment event to Event Bus
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = nanoid();
  const { content } = req.body;
  const { id } = req.params;

  // add comments by post id to db
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[id] = comments;

  await axios
    .post("http://event-bus-service:8000/events", {
      type: "CommentCreated",
      data: { id: commentId, content, postId: id, status: "pending" },
    })
    .catch((err) => console.log(err.message));

  res.status(200).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Recieved Event ", req.body);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    // console.log(comment);
    comment.status = status;

    await axios.post("http://event-bus-service:8000/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.status(200).send({});
});

// server run
app.listen(4001, () => console.log("Server listening on PORT:4001"));
