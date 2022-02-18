const express = require("express");
const axios = require("axios");

// app configs
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to store all incoming events
const eventsDataStore = [];

// recieve event and forward event-data
app.post("/events", async (req, res) => {
  const event = req.body;
  eventsDataStore.push(event);

  await axios
    .post("http://posts-clusterip-service:4000/events", event)
    .catch((err) => console.log("post event error  : ", err.message));
  await axios
    .post("http://comments-service:4001/events", event)
    .catch((err) => console.log("comment event error : ", err.message));
  await axios
    .post("http://query-service:4002/events", event)
    .catch((err) => console.log("query event error : ", err.message));
  await axios
    .post("http://moderation-service:8080/events", event)
    .catch((err) => console.log("moderation event error : ", err.message));

  res.status(200).send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

// server
app.listen(8000, () => console.log("Listening on PORT:8000"));
