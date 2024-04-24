const Pool = require('pg').Pool
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
})

const getApplicants = async () => {
  try {
    const result = await pool.query('SELECT * FROM applicants')
    console.log("All applicants", result.rows);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

const createApplicant = async (name: string, email: string, location: string, phone_number: string) => {
  try {
    const results = await pool.query(`INSERT INTO applicants (name, email, location, phone_number) VALUES ('${name}', '${email}', '${location}', '${phone_number}')`);
    return results.insertId;
  } catch (error) {
    throw error;
  }
}

const updateApplicant = async (id: number, name: string, email: string, location: string, phone_number: string) => {
  try {
    await pool.query(`UPDATE users SET name = ${name}, email = ${email}, location = ${location}, phone_number = ${phone_number} WHERE id = ${id}`);
    return id;
  } catch (error) {
    throw error;
  }
}

const deleteApplicant = async (id: number) => {
  try {
    await pool.query(`DELETE FROM users WHERE id = ${id}`);
    return id;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getApplicants,
  createApplicant,
  updateApplicant,
  deleteApplicant,
}