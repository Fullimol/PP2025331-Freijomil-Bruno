class Serie {
    constructor(id, url, name, language, generes, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.generes = generes;
        this.image = image;
    }

    // Método de instancia: Devuelve una representación JSON del objeto
    toJsonString() {
        return JSON.stringify(this);
    }

    // Método de clase: Crea una instancia a partir de un JSON string
    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Serie(data.id, data.url, data.name, data.language, data.generes, data.image);
    }

    // Método de instancia: Genera un elemento HTML con los datos de la serie
    createHtmlElement(guardado = false) {
        const container = document.createElement("div");
        container.classList.add("serie");

        const title = document.createElement("h2");
        title.textContent = this.name;

        const lang = document.createElement("p");
        lang.textContent = `Idioma: ${this.language}`;

        const genres = document.createElement("p");
        genres.textContent = `Géneros: ${this.generes.join(", ")}`;

        const img = document.createElement("img");
        img.src = this.image;
        img.alt = `Imagen de ${this.name}`;
        img.style.cursor = "pointer";

        // Al hacer clic en la imagen, se abre el enlace en otra pestaña
        img.addEventListener("click", () => {
            window.open(this.url, "_blank");
        });

        if (!guardado) {
            const saveButton = document.createElement("button");
            saveButton.textContent = "Guardar";
            saveButton.addEventListener("click", () => this.guardarSerie());
            container.appendChild(saveButton);
        }

        container.appendChild(title);
        container.appendChild(lang);
        container.appendChild(genres);
        container.appendChild(img);

        return container;
    }

    guardarSerie() {
        const seriesGuardadas = JSON.parse(localStorage.getItem("series")) || [];
        seriesGuardadas.push({
            id: this.id,
            url: this.url,
            name: this.name,
            language: this.language,
            genres: this.genres,
            image: this.image
        });
        localStorage.setItem("series", JSON.stringify(seriesGuardadas));
        alert(`${this.name} guardada.`);
        console.log(`Serie "${this.id}" guardada.`);
    }
}