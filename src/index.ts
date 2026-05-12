import express from "express";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', userRoute);


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
