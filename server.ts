import express from "express";
import http from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sendMailToUser } from "./src/controllers/mail-controller";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 1998;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Welcome to the mailer service");
});

app.post("/send-mail", sendMailToUser);

function startServer() {
  server.listen(port, () => {
    console.log(`MAILER SERVICE IS RUNNING ON PORT http://localhost:${port}`);
  });
}

startServer();

export default app;
