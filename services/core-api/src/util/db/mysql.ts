import mysql from 'mysql2/promise';

const user     = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const pool = mysql.createPool({
  host              : 'mysql-service',
  user              : user,
  password          : password,
  database          : database,
  waitForConnections: true,
  connectionLimit   : 10,
  queueLimit        : 0
});

export default pool;