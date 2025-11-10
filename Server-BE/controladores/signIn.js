import { pool } from "../data/db/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const signIn = async (request, response) => {

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Buscar usuario por email
    const result = await pool.query('SELECT email, password FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    
    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      token,
      message: "Inicio de sesión exitoso"
    });
  } catch (error) {
    console.error("SignIn error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}