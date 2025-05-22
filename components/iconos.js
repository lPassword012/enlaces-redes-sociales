/**
 * Módulo para gestionar los iconos de la aplicación
 * @module Iconos
 */

/**
 * Inicializa los iconos de Lucide
 */
export function inicializarIconos() {
  if (window.lucide) {
    window.lucide.createIcons()
  } else {
    console.error("Lucide no está disponible")
  }
}