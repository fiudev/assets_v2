import "./env";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";

import { router } from "./routes";

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("assets"));
app.use("/", router);

app.listen(PORT, console.log("> Listening"));
