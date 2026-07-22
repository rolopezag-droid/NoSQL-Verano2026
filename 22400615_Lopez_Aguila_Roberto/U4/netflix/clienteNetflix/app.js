const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");

const btnConsultar = document.getElementById("btnConsultar");
const listaPeliculas = document.getElementById("listaPeliculas");
const estadoCatalogo = document.getElementById("estadoCatalogo");
const mensajeFormulario = document.getElementById("mensajeFormulario");

const estilosPoster = [
    "poster-rojo",
    "poster-azul",
    "poster-morado",
    "poster-verde",
    "poster-naranja",
    "poster-gris"
];

// Guardar película
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const pelicula = {
        titulo: titulo.value.trim(),
        genero: genero.value.trim(),
        año: Number(año.value),
        duracion: Number(duracion.value),
        idioma: idioma.value.trim(),
        calificacion: Number(calificacion.value)
    };

    try {
        mensajeFormulario.textContent = "Guardando película...";

        const respuesta = await agregarPelicula(pelicula);

        mensajeFormulario.textContent = respuesta.mensaje;
        formulario.reset();

        await cargarPeliculas();

        setTimeout(() => {
            mensajeFormulario.textContent = "";
        }, 3500);

    } catch (error) {
        mensajeFormulario.textContent = error.message;
    }
});

// Consultar películas
btnConsultar.addEventListener("click", cargarPeliculas);

// Cargar automáticamente cuando abre la página
document.addEventListener("DOMContentLoaded", cargarPeliculas);

async function cargarPeliculas() {
    try {
        estadoCatalogo.textContent = "Cargando catálogo...";
        listaPeliculas.innerHTML = "";

        const peliculas = await obtenerPeliculas();

        mostrarPeliculas(peliculas);

        estadoCatalogo.textContent =
            `${peliculas.length} películas disponibles`;

    } catch (error) {
        estadoCatalogo.textContent = error.message;

        
        listaPeliculas.innerHTML = `
            <p>No fue posible cargar el catálogo.</p>
        `;
    }
}

function mostrarPeliculas(peliculas) {
    listaPeliculas.innerHTML = "";

    peliculas.forEach((pelicula, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta");

        const estilo = estilosPoster[indice % estilosPoster.length];

        const nombre = pelicula.titulo || "Sin título";
        const letra = nombre.charAt(0).toUpperCase();

        const tienePortada =
    typeof pelicula.portada === "string" &&
    pelicula.portada.trim() !== "";

tarjeta.innerHTML = `
    <div
        class="poster ${estilo} ${tienePortada ? "con-portada" : ""}"
        data-letra="${letra}"
    >
        ${
            tienePortada
                ? `
                    <img
                        src="${pelicula.portada}"
                        alt="Portada de ${nombre}"
                        class="poster-imagen"
                        onerror="
                            this.remove();
                            this.parentElement.classList.remove('con-portada');
                        "
                    >
                `
                : ""
        }

        <div class="poster-contenido">
            <h3>${nombre}</h3>

            <div class="poster-datos">
                <span>${pelicula.año || "Sin año"}</span>

                <span>${pelicula.genero || "Sin género"}</span>

                <span>
                    ${
                        pelicula.duracion
                            ? `${pelicula.duracion} min`
                            : "Sin duración"
                    }
                </span>

                <span>${pelicula.idioma || "Sin idioma"}</span>

                <span class="calificacion">
                    ★ ${pelicula.calificacion ?? "N/A"}
                </span>
            </div>
        </div>
    </div>
`;

        listaPeliculas.appendChild(tarjeta);
    });
}