// MENÚS DESPLEGABLES

const menus = document.querySelectorAll(".dropdown");

menus.forEach(menu => {

    // Abrir al pasar el mouse
    menu.addEventListener("mouseover", () => {
        menu.classList.add("open");
    });

    // Cerrar al retirar el mouse
    menu.addEventListener("mouseout", (event) => {

        if (!menu.contains(event.relatedTarget)) {
            menu.classList.remove("open");
        }

    });

    // Compatibilidad con teclado
    menu.addEventListener("focusin", () => {
        menu.classList.add("open");
    });

    menu.addEventListener("focusout", (event) => {

        if (!menu.contains(event.relatedTarget)) {
            menu.classList.remove("open");
        }

    });

    // Compatibilidad con dispositivos móviles
    const enlace = menu.querySelector(".dropdown-toggle");

    enlace.addEventListener("click", (event) => {

        if (window.matchMedia("(max-width: 768px)").matches &&
            !menu.classList.contains("open")) {

            event.preventDefault();
            menu.classList.add("open");

        }

    });

});
// SLIDER DE IMÁGENES

const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {

    const slides = slider.querySelectorAll(".slide");
    const botonAnterior = slider.querySelector(".anterior");
    const botonSiguiente = slider.querySelector(".siguiente");
    const indicadores = slider.querySelector(".slider-indicadores");

    let indiceActual = 0;

    // Crear indicadores
    slides.forEach((slide, indice) => {

        const indicador = document.createElement("button");

        indicador.classList.add("indicador");

        indicador.setAttribute("aria-label", `Ir a imagen ${indice + 1}`);

        indicadores.appendChild(indicador);

        indicador.addEventListener("click", () => {
            mostrarSlide(indice);
        });

    });

    const puntos = indicadores.querySelectorAll(".indicador");

    // Mostrar imagen seleccionada
    function mostrarSlide(indice) {

        slides[indiceActual].classList.remove("activo");
        puntos[indiceActual].classList.remove("activo");

        indiceActual = (indice + slides.length) % slides.length;

        slides[indiceActual].classList.add("activo");
        puntos[indiceActual].classList.add("activo");

    }

    // Botón siguiente
    botonSiguiente.addEventListener("click", () => {
        mostrarSlide(indiceActual + 1);
    });

    // Botón anterior
    botonAnterior.addEventListener("click", () => {
        mostrarSlide(indiceActual - 1);
    });

    // Activar primer indicador
    puntos[0].classList.add("activo");

    // Cambio automático cada 4 segundos
    setInterval(() => {
        mostrarSlide(indiceActual + 1);
    }, 4000);

});
// MENSAJES PERSONALIZADOS DE BIENVENIDA

const contenedorBienvenida = document.getElementById("bienvenida");

if (contenedorBienvenida) {

    // Detectar el idioma de la página
    const idioma = document.documentElement.lang;

    // Obtener la hora actual
    const hora = new Date().getHours();

    let saludo;

    // Determinar el saludo según la hora
    if (hora >= 5 && hora < 12) {
        saludo = idioma === "es" ? "¡Buenos días!" : "Good morning!";

    } else if (hora >= 12 && hora < 18) {
        saludo = idioma === "es" ? "¡Buenas tardes!" : "Good afternoon!";

    } else {
        saludo = idioma === "es" ? "¡Buenas noches!" : "Good evening!";
    }

    // Crear el mensaje según el idioma
    const mensaje = idioma === "es"
        ? "Bienvenido al mundo del fútbol brasileño. ¡Descubre su historia y pasión!"
        : "Welcome to the world of Brazilian football. Discover its history and passion!";

    // Modificar el DOM
    contenedorBienvenida.innerHTML = `
        <h2>${saludo}</h2>
        <p>${mensaje}</p>
    `;

}
