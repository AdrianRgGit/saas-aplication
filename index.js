const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./db/config");
dbConnection();

app.use(express.json());

app.use("/users", require("./routes/users"));
// app.use("/events", require("./routes/events"));

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
