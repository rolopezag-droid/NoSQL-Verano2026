const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('combined'));

app.get("/par/:numero", (req, res) => {
  const numero = Number(req.params.numero);
  if (numero % 2 === 0) {
    res.send(`El número ${numero} es par`);
  } else {
    res.send(`El número ${numero} es impar`);
  }
});

app.get("/edad/:edad", (req, res) => {
  const edad = Number(req.params.edad);
  const esMayorDeEdad = edad >= 18;
  if(esMayorDeEdad) {
    res.send(`La persona con edad ${edad} es mayor de edad`);
  } else {
    res.send(`La persona con edad ${edad} es menor de edad`);
  }
});

app.get("/calculadora/:operacion/:a/:b", (req, res) => {
  const operacion = req.params.operacion;
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  let resultado;

  switch (operacion) {
    case "suma":
      resultado = a + b;
      break;
    case "resta":
      resultado = a - b;
      break;
    case "multiplicacion":
      resultado = a * b;
      break;
    case "división":
      resultado = a / b;
      break;
    default:
      res.status(400).json({ error: "Operación no válida" });
      return;
  }

  res.send(`El resultado de ${operacion} ${a} y ${b} es: ${resultado}`);
});

app.get("/tabla/:numero", (req, res) => {
  const numero = Number(req.params.numero);
  const tabla = [];
  for (let i = 1; i <= 10; i++) {
    tabla.push(`${numero} x ${i} = ${numero * i}`);
  }
  res.send(tabla.join("<br>"));
});

app.get("/calificacion/:nota", (req, res) => {
  const nota = Number(req.params.nota);
  let calificacion;

  if (nota >= 90) {
    calificacion = "Excelente";
  } else if (nota >= 80) {
    calificacion = "Muy bien";
  } else if (nota >= 70) {
    calificacion = "Aprobado";
  } else {
    calificacion = "Reprobado";
  }

  res.send(`La calificación es: ${calificacion}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});