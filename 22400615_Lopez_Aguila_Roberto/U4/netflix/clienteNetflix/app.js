const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");

const listaPeliculas =
    document.getElementById("listaPeliculas");

const estadoCatalogo =
    document.getElementById("estadoCatalogo");

const listaSeries =
    document.getElementById("listaSeries");

const estadoSeries =
    document.getElementById("estadoSeries");

const mensajeFormulario =
    document.getElementById("mensajeFormulario");

const menuPeliculas =
    document.getElementById("menuPeliculas");

const menuSeries =
    document.getElementById("menuSeries");

const btnVerPeliculas =
    document.getElementById("btnVerPeliculas");

const btnVerSeries =
    document.getElementById("btnVerSeries");

const tabPeliculas =
    document.getElementById("tabPeliculas");

const tabSeries =
    document.getElementById("tabSeries");

const panelPeliculas =
    document.getElementById("panelPeliculas");

const panelSeries =
    document.getElementById("panelSeries");

const tituloCatalogo =
    document.getElementById("tituloCatalogo");

const subtituloCatalogo =
    document.getElementById("subtituloCatalogo");

const btnActualizarCatalogo =
    document.getElementById("btnActualizarCatalogo");

const estilosPoster = [
    "poster-rojo",
    "poster-azul",
    "poster-morado",
    "poster-verde",
    "poster-naranja",
    "poster-gris"
];

let tipoCatalogoActivo = "peliculas";
let peliculasCargadas = false;
let seriesCargadas = false;

// Guardar película
formulario.addEventListener(
    "submit",
    guardarPelicula
);

// Cambiar entre paneles
tabPeliculas.addEventListener(
    "click",
    () => cambiarPanel("peliculas")
);

tabSeries.addEventListener(
    "click",
    () => cambiarPanel("series")
);

menuPeliculas.addEventListener(
    "click",
    () => cambiarPanel("peliculas")
);

menuSeries.addEventListener(
    "click",
    () => cambiarPanel("series")
);

btnVerPeliculas.addEventListener(
    "click",
    () => cambiarPanel("peliculas")
);

btnVerSeries.addEventListener(
    "click",
    () => cambiarPanel("series")
);

// Actualizar el catálogo activo
btnActualizarCatalogo.addEventListener(
    "click",
    async () => {
        if (tipoCatalogoActivo === "peliculas") {
            await cargarPeliculas();
        } else {
            await cargarSeries();
        }
    }
);

// Cargar películas al abrir
document.addEventListener(
    "DOMContentLoaded",
    async () => {
        cambiarPanel("peliculas");
        await cargarPeliculas();
    }
);

async function guardarPelicula(evento) {
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
        mensajeFormulario.textContent =
            "Guardando película...";

        const respuesta =
            await agregarPelicula(pelicula);

        mensajeFormulario.textContent =
            respuesta?.mensaje ||
            "Película guardada correctamente";

        formulario.reset();

        await cargarPeliculas();
        cambiarPanel("peliculas");

        setTimeout(() => {
            mensajeFormulario.textContent = "";
        }, 3500);

    } catch (error) {
        mensajeFormulario.textContent =
            error.message;
    }
}

async function cambiarPanel(tipo) {
    tipoCatalogoActivo = tipo;

    const mostrarPeliculas =
        tipo === "peliculas";

    panelPeliculas.classList.toggle(
        "activo",
        mostrarPeliculas
    );

    panelSeries.classList.toggle(
        "activo",
        !mostrarPeliculas
    );

    panelPeliculas.hidden =
        !mostrarPeliculas;

    panelSeries.hidden =
        mostrarPeliculas;

    tabPeliculas.classList.toggle(
        "activo",
        mostrarPeliculas
    );

    tabSeries.classList.toggle(
        "activo",
        !mostrarPeliculas
    );

    tabPeliculas.setAttribute(
        "aria-selected",
        String(mostrarPeliculas)
    );

    tabSeries.setAttribute(
        "aria-selected",
        String(!mostrarPeliculas)
    );

    tituloCatalogo.textContent =
        mostrarPeliculas
            ? "Películas disponibles"
            : "Series disponibles";

    subtituloCatalogo.textContent =
        mostrarPeliculas
            ? "EXPLORA"
            : "MARATONEA";

    btnActualizarCatalogo.textContent =
        mostrarPeliculas
            ? "Actualizar películas"
            : "Actualizar series";

    if (
        !mostrarPeliculas &&
        !seriesCargadas
    ) {
        await cargarSeries();
    }

    if (
        mostrarPeliculas &&
        !peliculasCargadas
    ) {
        await cargarPeliculas();
    }
}

// Consultar películas
async function cargarPeliculas() {
    try {
        estadoCatalogo.textContent =
            "Cargando películas...";

        listaPeliculas.innerHTML = "";

        const respuesta =
            await obtenerPeliculas();

        const peliculas =
            normalizarLista(respuesta);

        mostrarContenido(
            peliculas,
            listaPeliculas,
            "pelicula"
        );

        peliculasCargadas = true;

        estadoCatalogo.textContent =
            `${peliculas.length} película${
                peliculas.length === 1
                    ? ""
                    : "s"
            } disponible${
                peliculas.length === 1
                    ? ""
                    : "s"
            }`;

    } catch (error) {
        peliculasCargadas = false;

        estadoCatalogo.textContent =
            error.message;

        listaPeliculas.innerHTML = `
            <p class="mensaje-error">
                No fue posible cargar las películas.
            </p>
        `;
    }
}

// Consultar series
async function cargarSeries() {
    try {
        estadoSeries.textContent =
            "Cargando series...";

        listaSeries.innerHTML = "";

        const respuesta =
            await obtenerSeries();

        const series =
            normalizarLista(respuesta);

        mostrarContenido(
            series,
            listaSeries,
            "serie"
        );

        seriesCargadas = true;

        estadoSeries.textContent =
            `${series.length} serie${
                series.length === 1
                    ? ""
                    : "s"
            } disponible${
                series.length === 1
                    ? ""
                    : "s"
            }`;

    } catch (error) {
        seriesCargadas = false;

        estadoSeries.textContent =
            error.message;

        listaSeries.innerHTML = `
            <p class="mensaje-error">
                No fue posible cargar las series.
            </p>
        `;
    }
}

// Aceptar distintas formas de respuesta
function normalizarLista(respuesta) {
    if (Array.isArray(respuesta)) {
        return respuesta;
    }

    if (Array.isArray(respuesta?.datos)) {
        return respuesta.datos;
    }

    if (Array.isArray(respuesta?.peliculas)) {
        return respuesta.peliculas;
    }

    if (Array.isArray(respuesta?.series)) {
        return respuesta.series;
    }

    return [];
}

// Mostrar películas o series
function mostrarContenido(
    contenidos,
    contenedor,
    tipo
) {
    contenedor.innerHTML = "";

    if (contenidos.length === 0) {
        contenedor.innerHTML = `
            <p class="catalogo-vacio">
                No hay ${
                    tipo === "serie"
                        ? "series"
                        : "películas"
                } disponibles.
            </p>
        `;

        return;
    }

    contenidos.forEach(
        (contenido, indice) => {
            const tarjeta =
                document.createElement("article");

            tarjeta.classList.add("tarjeta");

            const estilo =
                estilosPoster[
                    indice % estilosPoster.length
                ];

            const nombre =
                contenido.titulo ||
                contenido.nombre ||
                "Sin título";

            const letra =
                nombre.charAt(0).toUpperCase();

            const portada =
                typeof contenido.portada === "string"
                    ? contenido.portada.trim()
                    : "";

            const tienePortada =
                portada !== "";

            const añoContenido =
                contenido.año ??
                contenido.anio ??
                contenido.fechaEstreno ??
                contenido.fecha_estreno ??
                "Sin año";

            const duracionContenido =
                contenido.duracion != null
                    ? `${contenido.duracion} min`
                    : null;

            const temporadas =
                contenido.temporadas ??
                contenido.numeroTemporadas ??
                contenido.numero_temporadas;

            const episodios =
                contenido.episodios ??
                contenido.numeroEpisodios ??
                contenido.numero_episodios;

            const temporadasContenido =
                temporadas != null
                    ? `${temporadas} temporada${
                        Number(temporadas) === 1
                            ? ""
                            : "s"
                    }`
                    : null;

            const episodiosContenido =
                episodios != null
                    ? `${episodios} episodio${
                        Number(episodios) === 1
                            ? ""
                            : "s"
                    }`
                    : null;

            tarjeta.innerHTML = `
                <div
                    class="poster ${estilo} ${
                        tienePortada
                            ? "con-portada"
                            : ""
                    }"
                    data-letra="${escaparHTML(letra)}"
                >

                    ${
                        tienePortada
                            ? `
                                <img
                                    src="${escaparAtributo(portada)}"
                                    alt="Portada de ${escaparAtributo(nombre)}"
                                    class="poster-imagen"
                                    loading="lazy"
                                >
                            `
                            : ""
                    }

                    <div class="poster-contenido">

                        <span class="tipo-contenido">
                            ${
                                tipo === "serie"
                                    ? "SERIE"
                                    : "PELÍCULA"
                            }
                        </span>

                        <h3>
                            ${escaparHTML(nombre)}
                        </h3>

                        <div class="poster-datos">

                            <span>
                                ${escaparHTML(
                                    String(añoContenido)
                                )}
                            </span>

                            <span>
                                ${escaparHTML(
                                    contenido.genero ||
                                    "Sin género"
                                )}
                            </span>

                            ${
                                duracionContenido
                                    ? `
                                        <span>
                                            ${escaparHTML(
                                                duracionContenido
                                            )}
                                        </span>
                                    `
                                    : ""
                            }

                            ${
                                temporadasContenido
                                    ? `
                                        <span>
                                            ${escaparHTML(
                                                temporadasContenido
                                            )}
                                        </span>
                                    `
                                    : ""
                            }

                            ${
                                episodiosContenido
                                    ? `
                                        <span>
                                            ${escaparHTML(
                                                episodiosContenido
                                            )}
                                        </span>
                                    `
                                    : ""
                            }

                            <span>
                                ${escaparHTML(
                                    contenido.idioma ||
                                    "Sin idioma"
                                )}
                            </span>

                            <span class="calificacion">
                                ★ ${escaparHTML(
                                    String(
                                        contenido.calificacion ??
                                        "N/A"
                                    )
                                )}
                            </span>

                        </div>

                    </div>

                </div>
            `;

            const imagen =
                tarjeta.querySelector(
                    ".poster-imagen"
                );

            if (imagen) {
                imagen.addEventListener(
                    "error",
                    () => {
                        imagen.remove();

                        const poster =
                            tarjeta.querySelector(
                                ".poster"
                            );

                        poster.classList.remove(
                            "con-portada"
                        );
                    }
                );
            }

            contenedor.appendChild(tarjeta);
        }
    );
}

// Evitar que texto de la API rompa el HTML
function escaparHTML(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escaparAtributo(valor) {
    return escaparHTML(valor);
}