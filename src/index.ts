import express from "express";
import mainRoute from "./routes/index";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', mainRoute);


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
