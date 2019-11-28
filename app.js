const express = require("express");
const expressLayouts = require("express-ejs-layouts");


const port = process.env.port || 8000;


const app = express();

// livescores global var
let livescore = "";

// MIDDLEWARES
app.use(expressLayouts);
app.use(express.static("./public"));
// config
app.set("view engine", "ejs");

// cors
app.use((req, res, next) => {
    req.livescores = livescore;
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// ROUTES
app.use("/", require("./routes/indexRouter"));
app.use("/info", require("./routes/info"));
// api routes
app.use("/api/livescores", require("./routes/api/livescoreApi"));
app.use("/api/news", require("./routes/api/newsApi"));

app.listen(port, () => console.log(`server started on port ${port}`));