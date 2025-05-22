/**
 * Módulo para gestionar el contador de visitantes
 * @module ContadorVisitantes
 */

/**
 * Inicializa y actualiza el contador de visitantes
 * @param {HTMLElement} elementoContador - El elemento donde se mostrará el contador
 */
export function inicializarContador(elementoContador) {
  actualizarContadorVisitantes(elementoContador)
}

/**
 * Incrementa y muestra el contador de visitantes
 * @param {HTMLElement} elementoContador - El elemento donde se mostrará el contador
 */
function actualizarContadorVisitantes(elementoContador) {
  // Obtener el contador actual del almacenamiento local
  let visitantes = localStorage.getItem("contadorVisitantes")

  // Si no existe, inicializarlo a 0
  if (visitantes === null) {
    visitantes = 0
  } else {
    visitantes = Number.parseInt(visitantes)
  }

  // Incrementar el contador solo si es una nueva sesión
  if (!sessionStorage.getItem("visitaRegistrada")) {
    visitantes++
    localStorage.setItem("contadorVisitantes", visitantes)
    sessionStorage.setItem("visitaRegistrada", "true")
  }

  // Actualizar el texto en la página
  elementoContador.textContent = `Visitantes: ${visitantes}`
}