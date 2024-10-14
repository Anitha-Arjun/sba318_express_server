import express from "express";
import girlsRouter from "./routes/girlsClothing.js";

const app = express();

const PORT = 3000;

//Middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//API Routes
app.use("/api/girlsClothing", girlsRouter);

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
