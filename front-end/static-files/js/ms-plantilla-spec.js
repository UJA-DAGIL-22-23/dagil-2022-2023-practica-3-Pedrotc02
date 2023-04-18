/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


let deportista = {
    ref: {
        "@ref": {
            id: "ref persona 1"
        }
    },

    data: {
        nombre: "nombre prueba",
        apellidos: "apellidos prueba",
        fechaNacimiento: {
            dia: 2,
            mes: "mes",
            año: "año"
        },
        nacimiento: "nacimiento prueba",
        edad: 34,
        palmarésMundiales: [1111]
    }
}

let deportista2 = {
    ref: {
        "@ref": {
            id: "ref persona 2"
        }
    },

    data: {
        nombre: "nombre prueba2",
        apellidos: "apellidos prueba2",
        fechaNacimiento: {
            dia: 2,
            mes: "mes",
            año: "año"
        },
        nacimiento: "nacimiento prueba2",
        edad: 34,
        palmarésMundiales: [1111]
    }
}

let cuerpo = `
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

let formulario = `
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




describe("Plantilla.sustituyeTags: ", function() {
    it("Muestra los datos al sustituir los valores con los datos creados",
        function () {
            let plantilla = Plantilla.sustituyeTags(cuerpo, deportista)

            expect(plantilla.includes(deportista.data.nombre)).toBeTrue();
            expect(plantilla.includes(deportista.data.apellidos)).toBeTrue();
            expect(plantilla.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
            expect(plantilla.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
            expect(plantilla.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
            expect(plantilla.includes(deportista.data.edad)).toBeTrue();
            expect(plantilla.includes(deportista.data.nacimiento)).toBeTrue();
            expect(plantilla.includes(deportista.data.palmarésMundiales)).toBeTrue();
            
        });
});

let vector = [deportista, deportista2]

describe("Plantilla.imprimeTodosDeportistas: ", function() {
    const tituloPrueba = "Listado de deportistas"

    it("Muestra los datos de varias personas de ejemplo creadas ",
    function (){
        
        Plantilla.imprimeTodosDeportistas(vector)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.apellidos)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.edad)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nacimiento)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.fechaNacimiento.dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.fechaNacimiento.mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.fechaNacimiento.año)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.palmarésMundiales)).toBeTrue()

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.apellidos)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.edad)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nacimiento)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.fechaNacimiento.dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.fechaNacimiento.mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.fechaNacimiento.año)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.palmarésMundiales)).toBeTrue()
        
    });
});

describe("Plantilla.imprimeUnDeportista: ", function() {
    const tituloPrueba = "Mostrar una persona"

    it("Muestra los datos de varias personas de ejemplo creadas ",
    function (){
        //let plantilla = Plantilla.deportistaComoFormulario(deportista)
        Plantilla.imprimeUnDeportista(deportista)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.nombre)).toBeTrue()
        
    });
});


describe("Plantilla.añadirNuevoDeportista: ", function() {
    const tituloPrueba = "Añadir un deportista"

    it("Muestra el formulario de añadir una persona ",
    function (){
        Plantilla.añadirNuevoDeportista()

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("nombre")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("apellidos")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("dia")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("mes")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("año")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("edad")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("nacimiento")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("palmares")).toBeTrue()
        
    });
});

describe("Plantilla.imprimeUnDeportistEditar: ", function() {
    const tituloPrueba = "Editar una persona"

    it("Muestra el formulario con los datos de la persona a editar ",
    function (){
        Plantilla.imprimeUnDeportistaEditar(deportista)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.apellidos)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.edad)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.nacimiento)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.fechaNacimiento.dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.fechaNacimiento.mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.fechaNacimiento.año)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.palmarésMundiales)).toBeTrue()
        
    });
});


describe("Plantilla.imprimeNombreTodosDeportistas: ", function() {
    const tituloPrueba = "Listado de los nombres de deportistas"

    it("Muestra correctamente los nombres de las personas",
    function (){
        Plantilla.imprimeNombreTodosDeportistas(vector)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nombre)).toBeTrue()
        
    });
});


describe("Plantilla.ordenarNombres: ", function() {
    const tituloPrueba = "Listado de los nombres de deportistas ordenados alfabéticamente"

    it("Muestra correctamente los nombres de las personas",
    function (){
        Plantilla.ordenarNombres(vector)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nombre)).toBeTrue()
        
    });
});


describe("Plantilla.recuperaDatosAlmacenados y Plantilla.almacenaDatos: ", function() {
    
    it("Muestra los datos del deportista almacenado",
    function (){
        Plantilla.almacenaDatos(deportista)
        let resultado = Plantilla.recuperaDatosAlmacenados()
        
        expect(resultado.data.nombre == deportista.data.nombre).toBeTrue();
        expect(resultado.data.apellidos == deportista.data.apellidos).toBeTrue();
        
    });
});

describe("Plantilla.deportistaComoFormulario: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario",
    function (){
        let plantilla = Plantilla.deportistaComoFormulario(deportista)
        
        expect(plantilla.includes(deportista.data.nombre)).toBeTrue();
        expect(plantilla.includes(deportista.data.apellidos)).toBeTrue();
        expect(plantilla.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(plantilla.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(plantilla.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(plantilla.includes(deportista.data.edad)).toBeTrue();
        expect(plantilla.includes(deportista.data.nacimiento)).toBeTrue();
        expect(plantilla.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});

describe("Plantilla.formularioEditar.actualiza: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario de editar",
    function (){
        let formulario = Plantilla.formularioEditar.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});


describe("Plantilla.deportistaComoFormularioEditar: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario de editar",
    function (){
        let formulario = Plantilla.deportistaComoFormularioEditar(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});


describe("Plantilla.plantillaTablaDeportistasSoloNombres.actualiza: ", function() {
    
    it("Actualiza correctamente los nombres de los deportistas en la tabla",
    function (){
        let formulario = Plantilla.plantillaTablaDeportistasSoloNombres.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        
    });
});

describe("Plantilla.plantillaTablaDeportistas.actualiza: ", function() {
    
    it("Actualiza correctamente los datos del deportista en la tabla",
    function (){
        let formulario = Plantilla.plantillaTablaDeportistas.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});

describe("Plantilla.plantillaFormularioDeportista.actualiza: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario",
    function (){
        let formulario = Plantilla.plantillaFormularioDeportista.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});

















/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
