const seriesContainer = document.getElementById("series");
const siguienteButton = document.getElementById("siguiente");
const anteriorButton = document.getElementById("anterior");

let paginaActual = 1;
async function obtenerDatos() {
    seriesContainer.innerHTML = "";

    // obtener cada 6 series segun su id
    const seriesIds = [];
    const inicio = (paginaActual - 1) * 6 + 1;
    for (let i = 0; i < 6; i++) {
        seriesIds.push(inicio + i);
    }

    // hago la peticion por cada uno de los ids en mi array
    try {
        const seriesPromises = seriesIds.map(id =>
            fetch(`https://api.tvmaze.com/shows/${id}`)
                .then(response => response.json())
        );

        // Espero resolver todas las promesas del array de promesas.
        const response = await Promise.all(seriesPromises);


        console.log("Datos obtenidos exitosamente.");


        const seriesObjects = response.map(data => new Serie(
            data.id,
            data.url,
            data.name,
            data.language,
            data.genres,
            data.image?.medium
        ));

        // aca agrego cada serie al contenedor para mostrarlo.
        seriesObjects.forEach(serie => {
            const serieElement = serie.createHtmlElement();
            seriesContainer.appendChild(serieElement);
        });

    } catch (error) {
        console.error("Error al obtener las series:", error);
    }
}

function paginaSiguiente() {
    paginaActual += 1;
    obtenerDatos();
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual -= 1;
        obtenerDatos();
    }
}

siguienteButton.addEventListener("click", paginaSiguiente);
anteriorButton.addEventListener("click", paginaAnterior);

obtenerDatos();