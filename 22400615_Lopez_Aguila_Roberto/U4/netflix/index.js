const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const port = 3000;

app.use(morgan('dev'));

mongoose.connect('mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix')
.then(() => {
  console.log('Conectado correctamente a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});