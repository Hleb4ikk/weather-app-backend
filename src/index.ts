import express from "express";
import cors from "cors";
import weatherRouter from "./routes/weather";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Роуты
app.use("/weather", weatherRouter);

// Тестовый корневой маршрут
app.get("/", (_req, res) => {
  res.send("Weather API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
