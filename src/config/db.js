const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '3116316822',
    database: 'api_servicios_web'
});

module.exports = conexion;
