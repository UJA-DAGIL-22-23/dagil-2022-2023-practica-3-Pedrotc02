/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

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


/// Plantilla para poner los datos de un deportista en un tabla dentro de un formulario
Plantilla.formularioAñadir = {}

Plantilla.formularioEditar = {}


// Cabecera del formulario
Plantilla.formularioAñadir.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">Edad</th>
            <th width="15%">Nacimiento</th><th text-align:center">Dia</th><th text-align:center">Mes</th><th text-align:center">Año</th>
            <th width="5%">Palmarés Mundiales</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-nombre" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable"
                        id="form-persona-apellidos" 
                        name="apellidos_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable"
                        id="form-persona-edad" 
                        name="edad_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-nacimiento"
                        name="nacimiento_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" 
                        id="form-persona-dia" min="1" max="31"
                        name="dia_entrada_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-mes" 
                        name="fmes_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" 
                        id="form-persona-anio" min="1950" max="2004" size="8" 
                        name="año_entrada_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-palmares" min="1950" max="2004" size="8" 
                        name="palmares entrada"></td>
                        
                <td>
                    <div><th width="15%"></th><a href="javascript:Plantilla.guardar()" class="opcion-terciaria guardar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.procesarHome()" class="opcion-terciaria editar ocultar">Volver a home</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;



Plantilla.formularioEditar.formularioEditar = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="20%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">Edad</th>
            <th width="15%">Nacimiento</th><th text-align:center">Dia</th><th text-align:center">Mes</th><th text-align:center">Año</th>
            <th width="5%">Palmarés Mundiales</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                
                <td><input type="text" class="form-persona-elemento" disabled
                        value="${Plantilla.plantillaTags.ID}" id="form-personaEditada-id"
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-personaEditada-nombre" required value="${Plantilla.plantillaTags.NOMBRE}"
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable"
                        id="form-personaEditada-apellidos" required value="${Plantilla.plantillaTags.APELLIDOS}"
                        name="apellidos_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable"
                        id="form-personaEditada-edad" required value="${Plantilla.plantillaTags.EDAD}"
                        name="edad_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-personaEditada-nacimiento" required value="${Plantilla.plantillaTags.NACIMIENTO}"
                        name="nacimiento_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" 
                        id="form-personaEditada-dia" min="1" max="31" required value="${Plantilla.plantillaTags.FECHA.DIA}"
                        name="dia_entrada_persona"/></td> 
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-personaEditada-mes" required value="${Plantilla.plantillaTags.FECHA.MES}"
                        name="fmes_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" 
                        id="form-personaEditada-anio" min="1950" max="2004" size="8" required value="${Plantilla.plantillaTags.FECHA.ANIO}"
                        name="año_entrada_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-personaEditada-palmares" min="1950" max="2004" size="8" required value="${Plantilla.plantillaTags.PALMARES_MUNDIALES}"
                        name="palmares entrada"></td>
                        
                <td>
                    <div><th width="15%"></th><a href="javascript:Plantilla.guardarDatosEditados()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.procesarHome()" class="opcion-terciaria editar ocultar">Volver a home</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;


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
Plantilla.plantillaTablaDeportistasSoloNombres = {}

// Plantilla para poner los datos de un deportista en un tabla dentro de un formulario
Plantilla.plantillaFormularioDeportista = {}

// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null

// Cabecera de la tabla
Plantilla.plantillaTablaDeportistas.cabecera = `<table width="100%" class="listado-personas">
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


//Tabla para mostrar los nombres de los deportistas
Plantilla.plantillaTablaDeportistasSoloNombres.cabecera = `<table width="100%" class="listado-nombre-deportistas">
<thead>
    
    <th width="50%">Nombre</th>
</thead>
<tbody>
`;



Plantilla.plantillaTablaDeportistasSoloNombres.cuerpo = `

    <tr title="${Plantilla.plantillaTags.NOMBRE}">
        <td style="text-align:center;">${Plantilla.plantillaTags.NOMBRE}</td>  
    </tr>

`;

Plantilla.plantillaTablaDeportistasSoloNombres.pie = `
    </tbody>
    <div><a href="javascript:Plantilla.mostrarNombresOrdenados()" class="opcion-secundaria ordenar">Ordenar alfabéticamente</a></div>
    </table>

`




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
            <td>
                <div><a href="javascript:Plantilla.eliminar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Eliminar</a></div>
                <div><a href="javascript:Plantilla.procesarHome()" class="opcion-secundaria mostrar">Volver a home</a></div>
                <div><a href="javascript:Plantilla.editarDeportista('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria editar">Editar</a></div>
            </td>
        </tbody>
    </table>

    <div><a href="javascript:Plantilla.botonAnterior('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Anterior</a></div>
    <div><a href="javascript:Plantilla.botonSiguiente('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Siguiente</a></div>
    
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

let vectorDeportistas = null

Plantilla.imprimeTodosDeportistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector
    vectorDeportistas = vector
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
 * Recupera los valores almacenados del deportista que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Plantilla.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
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
 * Función principal para mostrar los datos de un deportista desde el MS y, posteriormente, imprimirla.
 * @param {String} idDeportista Identificador del deportista a mostrar
 */
Plantilla.mostrar = function (idDeportista) {
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista);
}


/**
 * Función para guardar los nuevos datos de una persona en la BBDD
 */
Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/nuevoDeportista/"
        let id_persona = document.getElementById("form-persona-nombre").value

        let palmares = document.getElementById("form-persona-palmares").value;


        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id": id_persona,
                "nombre": document.getElementById("form-persona-nombre").value,
                "apellidos": document.getElementById("form-persona-apellidos").value,
                "edad": parseInt(document.getElementById("form-persona-edad").value),
                "nacimiento": document.getElementById("form-persona-nacimiento").value,
                "fechaNacimiento":{
                    "dia": parseInt(document.getElementById("form-persona-dia").value),
                    "mes": document.getElementById("form-persona-mes").value,
                    "año": parseInt(document.getElementById("form-persona-anio").value)
                },
                "palmarésMundiales": document.getElementById("form-persona-palmares").value.split(',').map((elem) => parseInt(elem))

            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        // Plantilla.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

Plantilla.añadirNuevoDeportista = function(){
    let msj = Plantilla.formularioAñadir.formulario

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Añadir un deportista", msj)
}

Plantilla.eliminar = async function(idDeportista){
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/eliminarDeportista/" + idDeportista

        const response = await fetch(url, {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
          
        })

    } catch (error) {
        
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


/**
 * Función para guardar los datos editados de un deportista en la BBDD
 */
Plantilla.guardarDatosEditados = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/editarDeportista/"
        let id_persona = document.getElementById("form-personaEditada-id").value

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id": id_persona,
                "nombre": document.getElementById("form-personaEditada-nombre").value,
                "apellidos": document.getElementById("form-personaEditada-apellidos").value,
                "edad": parseInt(document.getElementById("form-personaEditada-edad").value),
                "nacimiento": document.getElementById("form-personaEditada-nacimiento").value,
                "fechaNacimiento":{
                    "dia": parseInt(document.getElementById("form-personaEditada-dia").value),
                    "mes": document.getElementById("form-personaEditada-mes").value,
                    "año": parseInt(document.getElementById("form-personaEditada-anio").value)
                },
                "palmarésMundiales": document.getElementById("form-personaEditada-palmares").value.split(',').map((elem) => parseInt(elem))

            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Plantilla.mostrar(id_persona)
        
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        console.error(error)
    }
}

Plantilla.formularioEditar.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.formularioEditar, deportista)
}


Plantilla.imprimeUnDeportistaEditar = function (deportista) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.deportistaComoFormularioEditar(deportista);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Editar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(deportista)
}


Plantilla.deportistaComoFormularioEditar = function (deportista) {
    return Plantilla.formularioEditar.actualiza( deportista );
}


Plantilla.editarDeportista = function(idDeportista){
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportistaEditar);
}

Plantilla.plantillaTablaDeportistasSoloNombres.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.cuerpo, deportista)
}


Plantilla.imprimeNombreTodosDeportistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector
    let msj = Plantilla.plantillaTablaDeportistasSoloNombres.cabecera
    // Compongo el contenido que se va a mostrar dentro de la tabla
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistasSoloNombres.actualiza(e))
    msj += Plantilla.plantillaTablaDeportistasSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de los nombres de deportistas", msj)
}


/**
 * Función principal para recuperar los nombres de los deportistas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listarNombres = function () {
    Plantilla.mostrarDeportistas(Plantilla.imprimeNombreTodosDeportistas);
}

/**
 * Función principal para ordenar alfabéticamente los nombres de jugadores 
 */
Plantilla.ordenarNombres = function (vectorNombres) {
    let vectorOrdenado = [];

    vectorNombres.forEach(element => vectorOrdenado.push(element.data.nombre))

    vectorOrdenado.sort();

    let msj = Plantilla.plantillaTablaDeportistasSoloNombres.cabecera
    vectorOrdenado.forEach(element => msj += Plantilla.plantillaTablaDeportistasSoloNombres.cuerpo.replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), element))
    msj += Plantilla.plantillaTablaDeportistasSoloNombres.pie

    Frontend.Article.actualizar("Listado de los nombres de deportistas ordenados alfabéticamente", msj)


}

/**
 * Función para mostrar por pantalla los nombres ordenados de los jugadores
 */

Plantilla.mostrarNombresOrdenados = function(){
    Plantilla.mostrarDeportistas(Plantilla.ordenarNombres);
}


Plantilla.botonAnterior = function(idPersona){
    
    let vector = vectorDeportistas
    
    let pos = vector.findIndex((element) => element.ref['@ref'].id === idPersona);
    if(pos == 0){
        pos = vector.length
    }
    pos = (pos - 1) 

    this.mostrar(vector[pos].ref['@ref'].id);
};

Plantilla.botonSiguiente = function(idPersona){
    
    let vector = vectorDeportistas
    
    let pos = vector.findIndex((element) => element.ref['@ref'].id === idPersona);
    pos = (pos + 1) % vector.length

    this.mostrar(vector[pos].ref['@ref'].id);
};
