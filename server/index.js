require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
// routes files
const users = require("./routes/users");
const portfolio = require("./routes/portfolio");
const industries = require("./routes/industries");
const photos = require("./routes/photos");
const technologies = require("./routes/technologies");
const service_technologies = require("./routes/service_tech");
const slider = require("./routes/slider");
const Setting = require("./routes/SettingRoute");
const Service_pages = require("./routes/Service_pagesRoute");
const service = require("./routes/ServiceRoutes");

const admin = require("./routes/Login");
const review = require("./routes/Review");

// middleware

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// pathes
app.use("/", users);
app.use("/", portfolio);
app.use("/", industries);
app.use("/", Service_pages);
app.use("/", service);
app.use("/", review);

app.use("/", admin);

app.use("/", photos);
app.use("/", technologies);
app.use("/", service_technologies);
app.use("/", slider);
app.use("/", Setting);

// port no
const PORT = 5005;

connectDB.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`server started ${PORT}`);
    });
  }
});
