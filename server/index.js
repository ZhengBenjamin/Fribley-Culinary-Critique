const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const stations = require("./routes/api/stations");
const suggestions = require("./routes/api/suggestions");

app.use("/api/stations", stations);
app.use("/api/suggestions", suggestions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port 5000"));