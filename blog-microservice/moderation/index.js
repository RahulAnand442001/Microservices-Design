const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    // sample moderated logic for processing comments
    const status = data.content.includes("normalization")
      ? "rejected"
      : "approved";

    await axios
      .post("http://event-bus-service:8000/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => console.log(err.message));
  }

  res.send({});
});

// server
app.listen(8080, () => console.log("Listening on PORT:8080"));
