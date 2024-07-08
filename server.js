const express = require("express");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const User = require("./models/user");
const router = express.Router();
const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use("/users", require("./routes/users"));
app.use("/bunch", require("./routes/bunch"));
const CREDS_FILE = "./creds.json";

app.get('/', (req, res) => res.send('API Running'));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
