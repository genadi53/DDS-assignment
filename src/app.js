require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const partsRoutes = require("./routes/parts-routes");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// const seed = require("../src/seeds/seeds");
// seed();

app.use("/api/", userRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/checkout", () => {
  res.send("Checkout route");
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port: ${port}`);
});
