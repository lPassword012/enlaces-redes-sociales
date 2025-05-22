// Importar componentes
import { inicializarTema } from "./components/gestorTemas.js"
import { inicializarContador } from "./components/contadorVisitantes.js"
import { inicializarIconos } from "./components/iconos.js"
import { actualizarAnioActual, obtenerElemento } from "./components/utilidades.js"

/**
 * Función principal que inicializa la aplicación
 */
function inicializarApp() {
  // Referencias a elementos del DOM
  const botonTema = obtenerElemento("cambiarTema")
  const contadorVisitantes = obtenerElemento("numeroVisitantes")
  const anioActual = obtenerElemento("anioActual")

  // Inicializar componentes
  inicializarIconos()
  inicializarTema(botonTema)
  inicializarContador(contadorVisitantes)
  actualizarAnioActual(anioActual)
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", inicializarApp)