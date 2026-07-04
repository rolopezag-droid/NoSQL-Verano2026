\# U2 - Actividad 1



\## Consultas MongoDB



1\. Mostrar todos los libros publicados después del año 2022.



```javascript

db\\\["libros"].find({ año: { $gt: 2022 } })

```



2\. Mostrar los usuarios cuya edad sea mayor o igual a 21 años.



```javascript

db\\\["usuarios"].find({ edad: { $gte: 21 } })

```



3\. Mostrar los libros con menos de 350 páginas.



```javascript

db\\\["libros"].find({ paginas: { $lt: 350 } })

```



4\. Mostrar los usuarios cuya edad sea menor o igual a 20 años.



```javascript

db\\\["usuarios"].find({ edad: { $lte: 20 } })

```



5\. Mostrar libros que no sean de Programación.



```javascript

db\\\["libros"].find({ categoria: { $ne:"Programacion" } })

```



6\. Usuarios de Ingeniería Informática de sexto semestre o más.



```javascript

db\\\["usuarios"].find({

\&#x20;carrera:"Ingeniería Informática",

\&#x20;semestre:{ $gte:6 }

})

```



7\. Libros de Programación o Bases de Datos.



```javascript

db\\\["libros"].find({

\&#x20;categoria:{ $in:\\\["Programación","Bases de Datos"] }

})

```



8\. Préstamos no devueltos con duración mayor a 8 días.



```javascript

db\\\["prestamos"].find({

\&#x20;devuelto:false,

\&#x20;dias:{ $gt:8 }

})

```



9\. Libros cuyo título empieza con M.



```javascript

db\\\["libros"].find({

\&#x20;titulo:{ $regex:"^M" }

})

```



10\. Usuarios cuyo nombre empieza con A.



```javascript

db\\\["usuarios"].find({

\&#x20;nombre:{ $regex:"^A" }

})

```



11\. Libros cuyo título contiene Base.



```javascript

db\\\["libros"].find({

\&#x20;titulo:{ $regex:"Base" }

})

```



12\. Mostrar nombre y carrera de usuarios.



```javascript

db\\\["usuarios"].find(

{},

{nombre:1,carrera:1,\\\_id:0}

)

```



13\. Mostrar título y autor de libros.



```javascript

db\\\["libros"].find(

{},

{titulo:1,autor:1,\\\_id:0}

)

```



14\. Mostrar usuario y libro de préstamos.



```javascript

db\\\["prestamos"].find(

{},

{usuario:1,libro:1,\\\_id:0}

)

```



15\. Libros ordenados por año más reciente.



```javascript

db\\\["libros"].find().sort({anio:-1})

```



16\. Usuarios ordenados por nombre.



```javascript

db\\\["usuarios"].find().sort({nombre:1})

```



17\. Préstamos ordenados por más días.



```javascript

db\\\["prestamos"].find().sort({dias:-1})

```



18\. Título y año desde 2022 ordenados.



```javascript

db\\\["libros"].find(

{anio:{$gte:2022}},

{titulo:1,anio:1,\\\_id:0}

).sort({anio:-1})

```



19\. Usuarios de Sistemas o Informática.



```javascript

db\\\["usuarios"].find(

{

\&#x20;carrera:{

\&#x20;$in:\\\[

\&#x20;"Ingeniería en Sistemas Computacionales",

\&#x20;"Ingeniería Informática"

\&#x20;]}

},

{nombre:1,carrera:1,\\\_id:0}

)

```



20\. Préstamos no devueltos mostrando usuario, libro y días.



```javascript

db\\\["prestamos"].find(

{devuelto:false},

{usuario:1,libro:1,dias:1,\\\_id:0}

).sort({dias:-1})

```

