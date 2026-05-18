import express from "express";
import mainRoute from "./routes/index";
import { logMiddleware } from "./middlewares/logMiddleware";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', apiKeyMiddleware, mainRoute);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
