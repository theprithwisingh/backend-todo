import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {PrismaClient} from "@prisma/client";
import { generateToken } from '../utils/generateToken';
const prisma = new PrismaClient();

export async function signupController(req, res) {
  const { name, username, email, password } = req.body;
  const existingUser  = prisma.user.findFirst({
    where: {
        OR: [{ username }, { email }],
    },
  });
  if (existingUser) {
    if (existingUser.email === email) {
      return res.status(400).json({ message: "This email already exists" });
    }
    if (existingUser.username === username) {
      return res.status(400).json({ message: "This username is already taken" });
    }
  }
  
  try {
    //password hasing and salting
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashPassword,
      },
    });

    return res.status(201).json({
      message: "user added",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: "something get wrong" });
  }
  next();
}
export async function signinController(req, res) {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }],
    },
  });
  //if user dont exist
  if (!user) {
    res.json({ message: "user is not found" });
  }
  //check password
  const isValid = await bcrypt.compare(password,user.password)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user)
  return res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username } });
 next()
}



export async function AddTodoController(req,res){
     const {title,description,category,priority,userId } = req.body;

      try {
        const newTodo = await prisma.toDo.create({
          data:{
            title,
            description,
            category,
            priority,
            userId:Number(userId)
          }
        })
        return res.status(201).json({ message: "Todo created", todo: newTodo });

      } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({ message: "Something went wrong", error });
      }
}
export async function getTodoController(req, res) {
  const id = req.params.id;

  try {
    const getTodo = await prisma.toDo.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!getTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo found", getTodo });
  } catch (error) {
    console.error("Error getting todo:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function updateTodoController(req, res) {
  const id = Number(req.params.id);
  const { title, description, category, priority } = req.body;

  try {
    const updatedTodo = await prisma.toDo.update({
      where: { id },
      data: {
        title,
        description,
        category,
        priority,
      },
    });

    return res.status(200).json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

export async function deleteTodoController(req, res) {
  const id = Number(req.params.id);

  try {
    const deleted = await prisma.toDo.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Todo deleted", todo: deleted });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
