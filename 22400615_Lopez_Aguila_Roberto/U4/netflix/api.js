const API_URL = "";

async function procesarRespuesta(respuesta, mensajeError) {
    let datos = null;

    try {
        datos = await respuesta.json();
    } catch (error) {
        datos = null;
    }

    if (!respuesta.ok) {
        throw new Error(
            datos?.mensaje ||
            datos?.message ||
            mensajeError
        );
    }

    return datos;
}

// Obtener películas
async function obtenerPeliculas() {
    const respuesta = await fetch(`${API_URL}/peliculas`);

    return procesarRespuesta(
        respuesta,
        "Error al consultar las películas"
    );
}

// Obtener series
async function obtenerSeries() {
    const respuesta = await fetch(`${API_URL}/series`);

    return procesarRespuesta(
        respuesta,
        "Error al consultar las series"
    );
}

// Agregar película
async function agregarPelicula(pelicula) {
    const respuesta = await fetch(`${API_URL}/peliculas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pelicula)
    });

    return procesarRespuesta(
        respuesta,
        "Error al guardar la película"
    );
}