const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dns = require('dns');

const app = express();
const port = 3000;

dns.setServers(['1.1.1.1', '8.8.8.8']);

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
  'mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix'
)
.then(() => {
  console.log('Conectado correctamente a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Netflix funcionando correctamente'
  });
});

// Aquí van tus demás rutas:
// app.get('/peliculas', ...)
// app.post('/peliculas', ...)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
}

module.exports = app;