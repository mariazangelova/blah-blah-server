require("dotenv").config();
const express = require("express");
const app = express();
const vision = require("@google-cloud/vision");
var bodyParser = require("body-parser");
const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;
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
    const client = new vision.ImageAnnotatorClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });

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
