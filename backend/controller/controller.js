import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function signupController(req, res, next) {
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
export async function signinController(req, res, next) {
  const { identifier, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
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
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email }, 
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
  )
  
  return res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username } });
 next()
}

export async function todoController(req, res, next) {
    const { id } = req.params;
  
    try {
      const todo = await prisma.todo.findUnique({
        where: { id: Number(id) }, // assuming id is a number
      });
  
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      res.status(200).json({ todo });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  