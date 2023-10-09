// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'nodejsdb-basic'
// })

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
import { Sequelize } from '@sequelize/core';
const sequelize = new Sequelize('nodejsdb-basic', 'root', 'root', {
  host: 'localhost',
  // one of our supported dialects:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: 'mysql'
});

 async function connectDB(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connectDB;
