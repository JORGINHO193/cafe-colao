// Reúne las secciones locales y construye los enlaces del directorio.
const hojas = document.getElementById("hojas-menu");
const grupos = {
  comidas: document.getElementById("enlaces-comidas"),
  bebidas: document.getElementById("enlaces-bebidas"),
};

function crearEnlace(id, texto) {
  const enlace = document.createElement("a");
  enlace.href = "#" + id;
  enlace.textContent = texto;
  return enlace;
}

const secciones = window.seccionesMenu.map(({ grupo, contenido }) => {
  const plantilla = document.createElement("template");
  plantilla.innerHTML = contenido.trim();
  const hoja = plantilla.content.firstElementChild;
  return { grupo, hoja, titulo: hoja.querySelector("h2").textContent.trim() };
});

const cantidadEsperada = document.querySelectorAll("script[data-hoja]").length;
if (secciones.length > 0 && secciones.length === cantidadEsperada) {
  hojas.replaceChildren();
  grupos.comidas.replaceChildren();
  grupos.bebidas.replaceChildren();
  secciones.forEach(({ grupo, hoja, titulo }, indice) => {
    grupos[grupo].append(crearEnlace(hoja.id, titulo));
    const siguiente = secciones[indice + 1];
    if (siguiente) {
      hoja.querySelector(".sheet-links").append(
        crearEnlace(siguiente.hoja.id, "Siguiente · " + siguiente.titulo)
      );
    }
    hojas.append(hoja);
  });
}

function marcarSeccion() {
  const enlaces = document.querySelectorAll(".section-links a");
  for (const enlace of enlaces) {
    if (enlace.hash === window.location.hash) {
      enlace.setAttribute("aria-current", "location");
    } else {
      enlace.removeAttribute("aria-current");
    }
  }
}

window.addEventListener("hashchange", marcarSeccion);
marcarSeccion();
