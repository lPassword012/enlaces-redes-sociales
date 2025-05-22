/**
 * Módulo para gestionar el tema de la aplicación
 * @module GestorTemas
 */

/**
 * Inicializa el gestor de temas
 * @param {HTMLElement} botonTema - El botón para cambiar el tema
 */
export function inicializarTema(botonTema) {
  // Aplicar el tema guardado al cargar la página
  aplicarTemaGuardado()

  // Agregar evento de clic al botón de tema
  botonTema.addEventListener("click", cambiarTema)
}

/**
 * Cambia entre tema claro y oscuro
 */
function cambiarTema() {
  const cuerpo = document.body

  if (cuerpo.classList.contains("tema-claro")) {
    cuerpo.classList.remove("tema-claro")
    cuerpo.classList.add("tema-oscuro")
    localStorage.setItem("tema", "oscuro")
  } else {
    cuerpo.classList.remove("tema-oscuro")
    cuerpo.classList.add("tema-claro")
    localStorage.setItem("tema", "claro")
  }
}

/**
 * Aplica el tema guardado en localStorage o usa el tema claro por defecto
 */
function aplicarTemaGuardado() {
  const cuerpo = document.body
  const temaGuardado = localStorage.getItem("tema")

  if (temaGuardado === "oscuro") {
    cuerpo.classList.remove("tema-claro")
    cuerpo.classList.add("tema-oscuro")
  } else {
    cuerpo.classList.add("tema-claro")
  }
}