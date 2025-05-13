const seriesContainer = document.getElementById("seriesGuardadas");
const botonOrdenarA = document.getElementById("botonOrdenarA");
const botonOrdenarZ = document.getElementById("botonOrdenarZ");
const botonBorrarTodo = document.getElementById("botonBorrarTodo");

function cargarStorage() {
    seriesContainer.innerHTML = "";

    const seriesGuardadas = JSON.parse(localStorage.getItem("series")) || [];

    if (seriesGuardadas.length === 0) {
        seriesContainer.innerHTML = "<p id='sinSeriesGuardadas'>¡¡¡No hay series guardadas!!!</p>";
        return;
    }

    seriesGuardadas.forEach(data => {
        const serie = new Serie(data.id, data.url, data.name, data.language, data.genres || [], data.image);
        seriesContainer.appendChild(serie.createHtmlElement(true));
    });
}

function ordenarAZ() {
    const seriesGuardadas = JSON.parse(localStorage.getItem("series"));
    seriesGuardadas.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("series", JSON.stringify(seriesGuardadas));
    cargarStorage();
    console.log("Ordenado de A a Z")
}

function ordenarZA() {
    const seriesGuardadas = JSON.parse(localStorage.getItem("series"));
    seriesGuardadas.sort((a, b) => b.name.localeCompare(a.name));
    localStorage.setItem("series", JSON.stringify(seriesGuardadas));
    cargarStorage();
    console.log("Ordenado de Z a A")
}

function borrarTodo() {
    localStorage.removeItem("series");
    alert("Todas las series han sido borradas.");
    cargarStorage();
}


botonOrdenarA.addEventListener("click", ordenarAZ);
botonOrdenarZ.addEventListener("click", ordenarZA);
botonBorrarTodo.addEventListener("click", borrarTodo);


cargarStorage();
console.log(JSON.parse(localStorage.getItem("series")));