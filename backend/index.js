import express from "express";
import {Pool} from 'pg'
import { signinController, signupController, todoController } from "./controller/controller";
const app  = express()
const PORT  = 3000;

const pool = new Pool({
    connectionString,
  });

app.use(cors());
app.use(express.json());

app.post("/login",signinController)

app.post("/signup",signupController)

app.get("/todo/:id",todoController)