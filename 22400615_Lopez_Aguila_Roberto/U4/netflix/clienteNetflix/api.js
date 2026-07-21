const API_URL = "https://netflix-xi-rust.vercel.app";

// Obtener películas
async function obtenerPeliculas() {
    const respuesta = await fetch(`${API_URL}/peliculas`);

    if (!respuesta.ok) {
        throw new Error("Error al consultar las películas");
    }

    return await respuesta.json();
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

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.mensaje || "Error al guardar la película"
        );
    }

    return datos;
}