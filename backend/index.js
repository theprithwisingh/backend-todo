import express from "express";
import cors from "cors"
import {signinController, signupController, AddTodoController, getTodoController, updateTodoController, deleteTodoController } from "./controller/controller.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
const app  = express()
const PORT  = 3000;

app.use(cors({

}));
app.use(express.json());

app.post("/login",signinController);

app.post("/signup",signupController);

app.post("/addtodo",authMiddleware,AddTodoController);

app.get("/gettodo/:id", getTodoController);

app.put("/todo/:id", updateTodoController);

app.delete("/todo/:id", deleteTodoController);


app.listen(PORT,console.log(`this server is running on ${PORT}`))