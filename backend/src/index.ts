import express from "express";
import cors from "cors";
import jobRoutes from "./routes/job.routes.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Estus Engine] Online and listening on port ${PORT}`);
});
