const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const port = 3000;

app.use(morgan('dev'));

mongoose.connect('mongodb://127.0.0.1:27017/escuela')
.then(() => {
  console.log('Conectado correctamente a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

const alumnosSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    carrera: { type: String, required: true, trim: true },
    semestre: { type: Number, required: true, min: 1 }
  },
  {
    timestamps: true
  }
);

const Alumno = mongoose.model('Alumno', alumnosSchema, "alumnos");

app.get('/alumnos', async (req, res) => {
  try{
    const alumnos = await Alumno.find();
    res.json(alumnos);
  }catch(error){
    res.status(500).json({
      mensaje: "Error al obtener alumnos",
      error: error
    });
  }
  res.json(Alumno);
});


app.get('/alumnos/:id', async (req, res) => {
  try {
    const id = (req.params.id);
    const alumno = await Alumno.findById(id);
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.json(alumno);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener alumno",
      error: error
    });
  }
});

app.post('/alumnos', async (req, res) => {
  try {
    const { nombre, carrera, semestre } = req.body;
    if (!nombre || !carrera || !semestre) {
      return res.status(400).json({
        error: "Faltan datos del alumno"
      });
    }
    const alumnoNuevo = new Alumno({
      nombre,
      carrera,
      semestre
    });
    const alumnoGuardado = await alumnoNuevo.save();
    return res.status(201).json({
      mensaje: "Alumno registrado correctamente",
      alumno: alumnoGuardado
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al guardar alumno",
      error: error.message
    });
  }
});

app.put('/alumnos/:id', async (req, res) => {
  try {
    const id = (req.params.id);
    const {nombre, carrera, semestre} = req.body;

  if (!nombre || !carrera || !semestre) {
    return res.status(400).json({ error: "Faltan datos del alumno" });
  }
  const alumnoActualizado = await Alumno.findByIdAndUpdate(
    id, 
    { nombre, carrera, semestre }, 
    { new: true, runValidators: true });
  if (!alumnoActualizado) {
    return res.status(404).json({ error: "Alumno no encontrado" });
  }
  res.json({
    mensaje: "Alumno actualizado correctamente", 
    alumno: alumnoActualizado});
}
catch (error) {
  res.status(500).json({
    mensaje: "Error al actualizar alumno",
    error: error
  });
}
});

app.delete('/alumnos/:id', async(req, res) => {
  try{
  const id = (req.params.id);
  const alumnoEliminado = await Alumno.findByIdAndDelete(id);
  if (!alumnoEliminado) {
    return res.status(404).json({ error: "Alumno no encontrado" });
  }
  res.json({ mensaje: "Alumno eliminado correctamente", alumno: alumnoEliminado });
} catch (error) {
  res.status(500).json({
    mensaje: "Error al eliminar alumno",
    error: error
  });
}
});

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.get('/mensaje', (req, res) => {
  res.send('Mensaje desde la ruta /mensaje');
});

app.get("/pagina", (req, res) => {
  const nombre = "Roberto";
  res.send(`Hola ${nombre}, bienvenido a mi pagina web`);
});

app.get("/pagina2", (req, res) => {
  res.send("<style> .p1{color: red;background-color: lightgray;} </style> <h1>Mi pagina web</h1><p class='p1'>Bienvenido a mi pagina web</p>");
});

app.get("/alumno", (req, res) => {
  res.json({ nombre: "Roberto", 
            carrera: "ISC", 
            semestre: 9 });
});

app.get("/materias", (req, res) => {
  res.json([
  {
    nombre: "NoSQL",
    hroa: "8:00 - 11:00",
  },
  {
    nombre: "Programacion Web",
    hroa: "11:00 - 14:00",
  }
  ])
});

app.get("/mensaje/:nombre", (req, res) => {
  res.send(`Hola ${req.params.nombre}, bienvenido a mi pagina web`);
});

app.get("/suma/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(`La suma de ${a} + ${b} es: ${a + b}`);
});

app.get("/multiplicar/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(`La multiplicacion de ${a} * ${b} es: ${a * b}`);
});

app.get("/aleatorio", (req, res) => {
  const numero = Math.floor(Math.random() * 100) + 1;
  res.send(`El numero generado es: ${numero}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});