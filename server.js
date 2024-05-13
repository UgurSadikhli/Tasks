const express = require("express");
const { fork } = require("child_process");
const cors = require("cors");
const app = express();
const port = 3000;

const objects = [];
let nextId = 1;

app.use(express.json());
app.use(cors());

const child = fork("./child.js");

child.on("message", (message) => {
  if (message.type === "new_object") {
    const objectWithId = { ...message.data, id: nextId++ };
    objects.push(objectWithId);
    console.log("Received from child:", objectWithId);
  }
});

app.post("/add", (req, res) => {
  const object = {
    id: nextId++,
    timestamp: new Date().toISOString(),
    data: "Added via request",
  };

  objects.push(object);

  res.send({ message: "Object added", object });
});

app.get("/", (req, res) => {
  res.send(objects);
});

process.on("SIGINT", () => {
  child.kill("SIGTERM");
  console.log("Server is shutting down.");
  process.exit();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
