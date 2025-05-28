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
  const anioActualElement = obtenerElemento("anioActual") // Ensure this is the one used
  const addLinkButton = obtenerElemento("addLinkButton")

  // Inicializar componentes
  inicializarIconos()
  inicializarTema(botonTema)
  inicializarContador(contadorVisitantes)
  actualizarAnioActual(anioActualElement)

  // Configurar event listeners
  if (addLinkButton) {
    addLinkButton.addEventListener("click", addLinkBox)
  } else {
    console.warn("El botón 'addLinkButton' no fue encontrado.")
  }

  // Delegación de eventos para botones de editar/eliminar en enlaces sociales
  const socialLinksSectionEvent = document.querySelector(".enlaces-sociales")
  if (socialLinksSectionEvent) {
    socialLinksSectionEvent.addEventListener("click", (event) => {
      const target = event.target
      const editButton = target.closest(".edit-link-btn")
      const deleteButton = target.closest(".delete-link-btn")
      const linkElement = target.closest("a.enlace")

      if (!linkElement) return // No es un clic dentro de un enlace

      if (editButton) {
        event.preventDefault() // Prevenir navegación si el botón está dentro de <a>
        // Prevenir que se abra el formulario de edición si ya está abierto en este enlace
        if (linkElement.classList.contains('editing')) {
            return;
        }
        // Marcar el enlace como en edición
        linkElement.classList.add('editing');
        editLinkBox(linkElement)
      } else if (deleteButton) {
        event.preventDefault() // Prevenir navegación
        // Opcional: agregar una confirmación antes de eliminar
        if (confirm("¿Estás seguro de que quieres eliminar este enlace?")) {
          deleteLinkBox(linkElement)
        }
      }
    })
  } else {
    console.warn("La sección 'enlaces-sociales' no fue encontrada para la delegación de eventos.")
  }
}

/**
 * Función para agregar un cuadro de diálogo para agregar nuevos enlaces.
 * Evita la creación de múltiples formularios si ya existe uno.
 */
function addLinkBox() {
  // Verificar si ya existe un formulario para agregar enlaces
  const existingForm = document.querySelector(".add-link-form")
  if (existingForm) {
    // Opcional: podrías darle foco o alguna indicación de que ya está abierto.
    // Por ahora, simplemente no creamos otro.
    console.warn("Un formulario para agregar enlaces ya está visible.")
    return
  }

  // Crear el contenedor del formulario
  const formContainer = document.createElement("div")
  formContainer.classList.add("add-link-form")

  // Crear campos de entrada
  const urlInput = document.createElement("input")
  urlInput.type = "text"
  urlInput.id = "newLinkURL"
  urlInput.placeholder = "https://example.com"

  const textInput = document.createElement("input")
  textInput.type = "text"
  textInput.id = "newLinkText"
  textInput.placeholder = "My Link"

  const iconInput = document.createElement("input")
  iconInput.type = "text"
  iconInput.id = "newLinkIcon"
  iconInput.placeholder = "lucide-icon-name"

  // Crear botones
  const saveButton = document.createElement("button")
  saveButton.id = "saveNewLinkButton"
  saveButton.textContent = "Save"

  const cancelButton = document.createElement("button")
  cancelButton.id = "cancelNewLinkButton"
  cancelButton.textContent = "Cancel"

  // Agregar elementos al contenedor del formulario
  formContainer.appendChild(urlInput)
  formContainer.appendChild(textInput)
  formContainer.appendChild(iconInput)
  formContainer.appendChild(saveButton)
  formContainer.appendChild(cancelButton)

  // --- Event Listeners for Save and Cancel buttons ---

  // "Save" button event listener
  saveButton.addEventListener("click", () => {
    const url = urlInput.value.trim()
    const text = textInput.value.trim()
    const iconName = iconInput.value.trim() // Assuming icon name is always provided for now

    if (url === "" || text === "") {
      alert("La URL y el Texto del enlace no pueden estar vacíos.")
      return
    }

    renderLink(url, text, iconName)
    formContainer.remove() // Remove the form after saving
  })

  // "Cancel" button event listener
  cancelButton.addEventListener("click", () => {
    formContainer.remove() // Remove the form on cancel
  })

  // Insertar el formulario en el DOM antes de la sección de enlaces sociales
  const socialLinksSection = document.querySelector(".enlaces-sociales")
  if (socialLinksSection) {
    socialLinksSection.parentNode.insertBefore(formContainer, socialLinksSection)
  } else {
    // Como fallback, si no se encuentra la sección, se agrega al final del main
    const mainElement = document.querySelector("main")
    if (mainElement) {
      mainElement.appendChild(formContainer)
    } else {
      console.error("No se encontró la sección 'enlaces-sociales' ni el elemento 'main'.")
    }
  }
}

/**
 * Función para renderizar un nuevo enlace en la sección de enlaces sociales.
 * @param {string} url - La URL del enlace.
 * @param {string} text - El texto visible del enlace.
 * @param {string} iconName - El nombre del icono de Lucide.
 */
function renderLink(url, text, iconName) {
  const socialLinksSection = document.querySelector(".enlaces-sociales")

  if (!socialLinksSection) {
    console.error("La sección 'enlaces-sociales' no fue encontrada.")
    return
  }

  // Crear el elemento <a>
  const linkElement = document.createElement("a")
  linkElement.href = url
  linkElement.target = "_blank"
  linkElement.classList.add("enlace", "enlace-dinamico") // Added 'enlace-dinamico' as requested

  // Crear el span del icono
  const iconSpan = document.createElement("span")
  iconSpan.classList.add("icono")
  iconSpan.setAttribute("data-lucide", iconName)

  // Crear el span del texto
  const textSpan = document.createElement("span")
  textSpan.classList.add("texto")
  textSpan.textContent = text

  // Ensamblar el enlace
  linkElement.appendChild(iconSpan)
  linkElement.appendChild(textSpan)

  // 1. Crear el div contenedor para los botones de acción
  const actionsDiv = document.createElement("div")
  actionsDiv.classList.add("link-actions")

  // 2. Crear el botón de Editar
  const editButton = document.createElement("button")
  editButton.classList.add("edit-link-btn")
  editButton.setAttribute("aria-label", `Edit ${text} link`) // Accessibility
  const editIconSpan = document.createElement("span")
  editIconSpan.classList.add("icono")
  editIconSpan.setAttribute("data-lucide", "edit")
  editButton.appendChild(editIconSpan)

  // 2. Crear el botón de Eliminar
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-link-btn")
  deleteButton.setAttribute("aria-label", `Delete ${text} link`) // Accessibility
  const deleteIconSpan = document.createElement("span")
  deleteIconSpan.classList.add("icono")
  deleteIconSpan.setAttribute("data-lucide", "trash-2")
  deleteButton.appendChild(deleteIconSpan)

  // Agregar botones al div de acciones
  actionsDiv.appendChild(editButton)
  actionsDiv.appendChild(deleteButton)

  // 3. Agregar el div de acciones al elemento del enlace principal
  linkElement.appendChild(actionsDiv)

  // Agregar el nuevo enlace a la sección
  socialLinksSection.appendChild(linkElement)

  // Actualizar los iconos de Lucide
  // Asumimos que 'lucide' está disponible globalmente o importado correctamente
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  } else {
    console.warn("Lucide no está definido. No se pudieron renderizar los iconos.")
  }
}

/**
 * Función para transformar un enlace existente en un formulario de edición.
 * @param {HTMLElement} linkElement - El elemento <a> del enlace a editar.
 */
function editLinkBox(linkElement) {
  if (!linkElement) {
    console.error("Elemento de enlace no proporcionado para editLinkBox.")
    return
  }

  // 1. Identificar valores actuales
  const currentURL = linkElement.href
  const currentTextElement = linkElement.querySelector('.texto')
  const currentIconElement = linkElement.querySelector('.icono')

  if (!currentTextElement || !currentIconElement) {
    console.error("El enlace proporcionado no tiene la estructura esperada (falta .texto o .icono).")
    return
  }

  const currentText = currentTextElement.textContent
  const currentIconName = currentIconElement.getAttribute('data-lucide')

  // Guardar el contenido original para posible cancelación
  const originalContent = linkElement.innerHTML

  // 2. Crear campos de entrada (pre-llenados)
  const urlInput = document.createElement("input")
  urlInput.type = "text"
  urlInput.value = currentURL
  urlInput.classList.add("edit-link-url") // Clase para identificarlo

  const textInput = document.createElement("input")
  textInput.type = "text"
  textInput.value = currentText
  textInput.classList.add("edit-link-text")

  const iconInput = document.createElement("input")
  iconInput.type = "text"
  iconInput.value = currentIconName
  iconInput.classList.add("edit-link-icon")

  // 3. Crear botones "Save" y "Cancel"
  const saveButton = document.createElement("button")
  saveButton.textContent = "Save"
  saveButton.classList.add("edit-link-save")

  const cancelButton = document.createElement("button")
  cancelButton.textContent = "Cancel"
  cancelButton.classList.add("edit-link-cancel")
  // Guardar el contenido original en el botón de cancelar para restaurarlo
  cancelButton.onclick = () => {
      linkElement.innerHTML = originalContent
      linkElement.classList.remove('editing'); // Remover clase de edición
      const originalHref = linkElement.getAttribute('data-original-href')
      if (originalHref) {
        linkElement.setAttribute('href', originalHref)
      }
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
  }

  // Event listener para el botón "Save"
  saveButton.addEventListener("click", () => {
    const newURL = urlInput.value.trim()
    const newText = textInput.value.trim()
    const newIconName = iconInput.value.trim()

    if (newURL === "" || newText === "") {
      alert("La URL y el Texto del enlace no pueden estar vacíos.")
      return
    }

    // Actualizar el contenido original del enlace
    currentTextElement.textContent = newText
    currentIconElement.setAttribute('data-lucide', newIconName)
    
    // Restaurar el contenido original (ya actualizado)
    linkElement.innerHTML = '' // Limpiar los inputs
    linkElement.appendChild(currentIconElement) // El icono original, ahora actualizado
    linkElement.appendChild(currentTextElement) // El texto original, ahora actualizado
    
    // Re-agregar los botones de acción (Edit/Delete) que estaban en originalContent
    // Esto es un poco simplista, idealmente se recrearían o se manejaría de forma más robusta
    // Para este caso, asumimos que `originalContent` contenía los botones de acción.
    // Una mejor aproximación sería reconstruir el div 'link-actions' aquí.
    // Sin embargo, `originalContent` ya tiene la estructura de los botones de acción.
    // Lo que necesitamos es asegurar que el linkElement principal tenga su contenido correcto.
    
    // El `originalContent` que guardamos al inicio de `editLinkBox` contiene
    // el span de icono, el span de texto y el div de `link-actions`.
    // Lo que hacemos ahora es actualizar el `currentTextElement` y `currentIconElement`
    // y luego los reinsertamos. Para los botones de acción, los necesitamos de nuevo.
    // Una forma es clonarlos del originalContent o re-crearlos.

    // Reconstruir el linkElement con los elementos actualizados y los botones de acción
    linkElement.innerHTML = '' // Limpiar de nuevo por si acaso
    linkElement.appendChild(currentIconElement)
    linkElement.appendChild(currentTextElement)

    // Re-crear y añadir el div de acciones
    const actionsDiv = document.createElement("div")
    actionsDiv.classList.add("link-actions")

    const newEditButton = document.createElement("button")
    newEditButton.classList.add("edit-link-btn")
    newEditButton.setAttribute("aria-label", `Edit ${newText} link`) // Accessibility
    const newEditIconSpan = document.createElement("span")
    newEditIconSpan.classList.add("icono")
    newEditIconSpan.setAttribute("data-lucide", "edit")
    newEditButton.appendChild(newEditIconSpan)

    const newDeleteButton = document.createElement("button")
    newDeleteButton.classList.add("delete-link-btn")
    newDeleteButton.setAttribute("aria-label", `Delete ${newText} link`) // Accessibility
    const newDeleteIconSpan = document.createElement("span")
    newDeleteIconSpan.classList.add("icono")
    newDeleteIconSpan.setAttribute("data-lucide", "trash-2")
    newDeleteButton.appendChild(newDeleteIconSpan)

    actionsDiv.appendChild(newEditButton)
    actionsDiv.appendChild(newDeleteButton)
    linkElement.appendChild(actionsDiv)

    // Actualizar el href del linkElement
    linkElement.href = newURL
    // Restaurar el atributo href y quitar el data-original-href
    const originalHrefFromData = linkElement.getAttribute('data-original-href')
    if (originalHrefFromData) { // Debería existir
        linkElement.setAttribute('href', newURL) // Usar el nuevo URL
        linkElement.removeAttribute('data-original-href')
    }
    
    linkElement.classList.remove('editing'); // Remover clase de edición

    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  })

  // 4. Reemplazar contenido del enlace con los campos de edición
  linkElement.innerHTML = '' // Limpiar el contenido existente (icono y texto y botones de acción)
  linkElement.appendChild(urlInput)
  linkElement.appendChild(textInput)
  linkElement.appendChild(iconInput)
  linkElement.appendChild(saveButton)
  linkElement.appendChild(cancelButton)

  // Se quita el href temporalmente para evitar navegación durante la edición
  // linkElement.setAttribute('data-original-href', currentURL); // Ya se hizo al principio
  if (linkElement.href) { // Si tiene href (que debería ser el caso)
      linkElement.setAttribute('data-original-href', linkElement.href)
      linkElement.removeAttribute('href')
  }
}

/**
 * Función para eliminar un enlace del DOM.
 * @param {HTMLElement} linkElement - El elemento <a> del enlace a eliminar.
 */
function deleteLinkBox(linkElement) {
  if (!linkElement) {
    console.error("Elemento de enlace no proporcionado para deleteLinkBox.")
    return
  }

  if (linkElement.parentNode) {
    linkElement.parentNode.removeChild(linkElement)
  } else {
    // Si el elemento no tiene padre, podría ya haber sido eliminado o no estar en el DOM
    console.warn("El elemento a eliminar no tiene un nodo padre.", linkElement)
  }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", inicializarApp)