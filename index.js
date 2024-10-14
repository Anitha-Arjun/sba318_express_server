import express from "express";
import dressRouter from "./routes/dress.js";
import productRouter from "./routes/productDetails.js";
import locationRouter from "./routes/location.js";

const app = express();

const PORT = 3000;

//set template enginge
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

//Middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.render("index", { title: "SBA318_Express_Server" });
});

//API Routes
app.use("/api/dress", dressRouter);
app.use("/api/productDetails", productRouter);
app.use("/api/location", locationRouter);

app.get("/", (req, res) => {
  res.send("SBA318_Express_Server_Application");
});

//Error middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
