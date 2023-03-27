/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


// Plantilla para poner los datos de varios deportistas dentro de una tabla
Plantilla.plantillaTablaDeportistas = {}

// Plantilla para poner los datos de un deportista en un tabla dentro de un formulario
Plantilla.plantillaFormularioDeportista = {}

// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null


// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "EDAD": "### EDAD ###",
    "NACIMIENTO":  "### NACIMIENTO ###",
    "FECHA": {DIA: "###DIA###", MES: "###MES###", ANIO: "###ANIO###"},
    "PALMARES_MUNDIALES": "### PALMARES_MUNDIALES ###"

}

// Cabecera de la tabla
Plantilla.plantillaTablaDeportistas.cabecera = `<table width="100%" class="listado-deportistas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">Edad</th>
                        <th width="15%">Lugar Nacimiento</th>
                        <th width="15%">Fecha Nacimiento</th>
                        <th width="15%">Palmares Mundiales</th>
                    </thead>
                    <tbody>
    `;


// Elemento TR que muestra los datos de un deportista
Plantilla.plantillaTablaDeportistas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.EDAD}</td>
        <td>${Plantilla.plantillaTags.NACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.FECHA.DIA}/${Plantilla.plantillaTags.FECHA.MES}/${Plantilla.plantillaTags.FECHA.ANIO}</td>
        <td>${Plantilla.plantillaTags.PALMARES_MUNDIALES}</td>
        <td>
            <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Pie de la tabla
Plantilla.plantillaTablaDeportistas.pie = `        </tbody>
             </table>
             `;



// Cabecera del formulario
Plantilla.plantillaFormularioDeportista.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">Edad</th>
            <th width="15%">Año Nacimiento</th><th width="25%">Fecha</th><th width="25%">Palmarés Mundiales</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
            <td>${Plantilla.plantillaTags.ID}</td>
            <td>${Plantilla.plantillaTags.NOMBRE}</td>
            <td>${Plantilla.plantillaTags.APELLIDOS}</td>
            <td>${Plantilla.plantillaTags.EDAD}</td>
            <td>${Plantilla.plantillaTags.NACIMIENTO}</td>
            <td>${Plantilla.plantillaTags.FECHA.DIA}/${Plantilla.plantillaTags.FECHA.MES}/${Plantilla.plantillaTags.FECHA.ANIO}</td>
            <td>${Plantilla.plantillaTags.PALMARES_MUNDIALES}</td>
        </tbody>
    </table>
</form>
`;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del deportista que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Plantilla} deportista Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)   
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), deportista.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), deportista.data.edad)
        .replace(new RegExp(Plantilla.plantillaTags.NACIMIENTO, 'g'), deportista.data.nacimiento)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA.DIA, 'g'), deportista.data.fechaNacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA.MES, 'g'), deportista.data.fechaNacimiento.mes)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA.ANIO, 'g'), deportista.data.fechaNacimiento.año)
        .replace(new RegExp(Plantilla.plantillaTags.PALMARES_MUNDIALES, 'g'), deportista.data.palmarésMundiales)
}


/**
 * Actualiza el cuerpo de la tabla con los datos del deportista que se le pasa
 * @param {deportista}  Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaDeportistas.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.cuerpo, deportista)
}

/**
 * Función que recupera todos los deportistas llamando al MS plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.mostrarDeportistas = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodosDeportistas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los deportistas que se han descargado
    let vectorDeportistas = null
    if (response) {
        vectorDeportistas = await response.json()
        callBackFn(vectorDeportistas.data)
    }
}

Plantilla.imprimeTodosDeportistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e))
    msj += Plantilla.plantillaTablaDeportistas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj)
}

/**
 * Función principal para recuperar los deportistas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listar = function () {
    Plantilla.mostrarDeportistas(Plantilla.imprimeTodosDeportistas);
}

/**
 * Actualiza el formulario con los datos del deportista que se le pasa
 * @param {Plantilla} deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaFormularioDeportista.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.formulario, deportista)
}


/**
 * Almacena los datos del deportista que se está mostrando
 * @param {Plantilla} deportista Datos del deportista a almacenar
 */
Plantilla.almacenaDatos = function (deportista) {
    Plantilla.personaMostrada = deportista;
}

/**
 * Imprime los datos de un deportista como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {deportista} Plantilla Objeto con los datos del deportista
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.deportistaComoFormulario = function (deportista) {
    return Plantilla.plantillaFormularioDeportista.actualiza( deportista );
}

/**
 * Función para mostrar en pantalla los detalles de un deportista que se ha recuperado de la BBDD por su id
 * @param {Plantilla} deportista Datos de la persona a mostrar
 */
Plantilla.imprimeUnDeportista = function (deportista) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.deportistaComoFormulario(deportista);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(deportista)
}

/**
 * Función que recuperar todos los deportistas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idDeportista Identificador del deportista a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnDeportista = async function (idDeportista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idDeportista
        const response = await fetch(url);
        if (response) {
            const deportista = await response.json()
            callBackFn(deportista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
mostrar
 * Función principal para mostrar los datos de un deportista desde el MS y, posteriormente, imprimirla.
 * @param {String} idDeportista Identificador del deportista a mostrar
 */
Plantilla.mostrar = function (idDeportista) {
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista);
}



