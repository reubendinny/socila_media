const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
	console.log("Mongo connected");
});
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
//app.use("/api/auth/register",authRoute)

app.listen(8800, ()=>{
    console.log("Backend server is running")
});