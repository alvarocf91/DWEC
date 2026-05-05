const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'biblioteca.cnozidwcqrsm.us-east-1.rds.amazonaws.com',
  user: 'alvarocf91',
  password: 'Biblioteca123', 
  database: 'Biblioteca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();