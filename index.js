require("dotenv").config();
const express = require("express");
const app = express();
const vision = require("@google-cloud/vision");
var bodyParser = require("body-parser");
// const db = require("db");
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi from express");
});

app.post("/google-vision", cors(), (req, res) => {
  async function quickstart() {
    const imageUrl = req.body.imageUrl;
    // Create a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection(imageUrl);
    const labels = result.labelAnnotations;
    //console.log("Labels:");
    //labels.forEach((label) => console.log(label.description));
    res.status(200).send(labels);
  }
  quickstart();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
