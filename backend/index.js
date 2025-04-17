import express from "express";
import {pool} from 'pg'
const app  = express()
const PORT  = 3000;


  const connectionString = "postgresql://todo_owner:npg_l8gwZO9BiJsD@ep-bitter-river-a4wqx9qd-pooler.us-east-1.aws.neon.tech/todo?sslmode=require";
  const pool = new Pool({
    connectionString, // 👈 This is how you link with URL
  });
// app.use(cors());
app.use(express.json());
app.post("/sign", function(res,res) {
    const username = req.body;
    const password = req.body;
    if()

    res.json({ message: "Welcome to the Prithwi" });
});
app.listen(PORT, ()=>{
    console.log(`server is runinng on PORT ${PORT}`)
})