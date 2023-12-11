import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";


export const register = async (req, res) => {
  const { password, email, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json("the email is already is use");

    const passwordHast = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      username,
      password: passwordHast
    });

    const userSaves = await newUser.save()

    const token = await createAccessToken({ id: userSaves._id })
    res.cookie('token', token)
    res.json({
      id: userSaves._id,
      username: userSaves.username,
      email: userSaves.email,
      create: userSaves.createdAt,
      update: userSaves.updatedAt,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {

    // buscardo el usuario
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json('no se encontro el usuario');

    // validando la contraseña 
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json('cotraseña incorrecta');

    // creando el token
    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token);

    // devulviendo el usuario 
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })

    // manejando los errores 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const { id } = req.user;

  const userFound = await User.findById(id)

  if (!userFound) return res.status(404).json({ message: "User Not Found" })

  return res.json({
    id: userFound._id,
    userName: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) res.status(404).json({ message: "Unauthorized" })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(404).json({ message: "Unauthozed" })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(404).json({ message: "Unauthozed" })
    return res.json({
      id: userFound._id,
      username: userFound.unsername,
      email: userFound.email,
    })
  })
}