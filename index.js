



const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Tu Usuario de My sql',
  password: 'Tu contraseña',
  database: 'gamme_schema'
});

app.get('/', (req, res) => {
  connection.connect(err => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.stack);
      return res.send('Error al conectar a la base de datos');
    }

    // Realizar una consulta SELECT
    connection.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        console.error('Error al realizar la consulta: ' + err.stack);
        return res.send('Error al realizar la consulta');
      }

      // Renderizar los datos en una página HTML
      let html = '<h1>Lista de Usuarios</h1>';
      html += '<ul>';
      results.forEach(row => {
        html += `<li>ID: ${row.id}, Nombre: ${row.nombre}, Edad: ${row.edad}</li>`;
      });
      html += '</ul>';

      res.send(html);

      // Cerrar la conexión a la base de datos
      connection.end();
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`La aplicación web está escuchando en http://localhost:${port}`);
});
