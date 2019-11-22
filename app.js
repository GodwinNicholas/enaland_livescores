const express = require("express");
const expressLayouts = require("express-ejs-layouts");


const port = process.env.port || 8000;

const app = express();

// MIDDLEWARES
app.use(expressLayouts);
app.use(express.static("./public"));
// config
app.set("view engine", "ejs");

// ROUTES
app.use("/", require("./routes/indexRouter"));
app.use("/info", require("./routes/info"));
// api routes
app.use("/api/livescores", require("./routes/api/livescoreApi"));
app.use("/api/news", require("./routes/api/newsApi"));

app.listen(port, () => console.log(`server started on port ${port}`));