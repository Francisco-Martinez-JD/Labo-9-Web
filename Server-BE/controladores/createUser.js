import { pool } from "../data/db/connection.js";
import bcrypt from 'bcrypt';

export const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ error: 'name, email y password requeridos' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    return response.status(201).send(`User added with ID: ${result.rows[0].id}`);
  } catch (error) {
    console.error('Error creating user:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
