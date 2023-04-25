const express = require("express");
const app = express();
app.use(express.json());
const videoRoutes = require("./routes/videos");
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT  = process.env.PORT;


// const router = express.Router(); // To use router, instantiate it like this
// This middleware allows us to post JSON in request.body
app.use("/public-images",express.static("./public/images"));


app.use((req, res, next) => {
    console.log('Hey Middleware');
    next();
})

app.use("/", videoRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port 8080" );
});
