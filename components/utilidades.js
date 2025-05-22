/**
 * Módulo con funciones de utilidad
 * @module Utilidades
 */

/**
 * Actualiza el elemento con el año actual
 * @param {HTMLElement} elementoAnio - El elemento donde se mostrará el año
 */
export function actualizarAnioActual(elementoAnio) {
  elementoAnio.textContent = new Date().getFullYear()
}

/**
 * Obtiene una referencia a un elemento del DOM
 * @param {string} id - El ID del elemento a obtener
 * @returns {HTMLElement} El elemento del DOM
 */
export function obtenerElemento(id) {
  const elemento = document.getElementById(id)
  if (!elemento) {
    console.error(`Elemento con ID '${id}' no encontrado`)
  }
  return elemento
}