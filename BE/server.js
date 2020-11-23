const expres = require("express");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors=require("cors")
const app = expres();
const port = 9000;

const Messages = require("./dbMessages");

//------------mongodb online configuration-----------
const password = "rMQ4mHjqMlpqCfRN";
const dbname = "aviDB";
const connection_url = `mongodb+srv://admin:${password}@cluster0.u36js.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//----------------pusher configuration---------------
const pusher = new Pusher({
  appId: "1070539",
  key: "51bb99f87b0f71526a77",
  secret: "eca52354c70aceee1ff5",
  cluster: "ap2",
  encrypted: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp:messageDetails.timestamp,
        received:messageDetails.received
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//----------------------middleware-------------------
app.use(expres.json());
app.use(cors())

//----------------------Routes------------------------
app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello world");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(201);
      res.send(`new message created: \n ${data}`);
    }
  });
});

//--------------------Listen------------------------
app.listen(port, () => console.log(`Listening on localhost:${port}`));
