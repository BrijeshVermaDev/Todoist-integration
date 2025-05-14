import express from "express";
import cors from "cors";
import helmet from "helmet";
import treeRoutes from "./routes/tree.routes";
import { limiter } from "./middleware/rateLimit.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { setupSwagger } from "./docs/swagger";
import { config } from "./config";

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

setupSwagger(app);
app.use(`/api/v${config.VERSION}`, treeRoutes);
app.use(errorHandler);

export default app;
