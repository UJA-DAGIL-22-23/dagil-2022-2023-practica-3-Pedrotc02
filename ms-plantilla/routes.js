/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve todas las personas que hay en la BBDD
 */
router.get("/getTodosDeportistas", async (req, res) => {
    try {
        await callbacks.getTodosDeportistas(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.get("/getTodosDeportistasPruebas", async (req, res) => {
    try {
        await callbacks.getTodosDeportistasPruebas(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.param("idDeportista", (req, res, next, id) => {
    next();
});

/**
 * Devuelve los datos del deportista con el id pasado
 */
router.get("/getPorId/:idDeportista", async (req, res) => {
    try {
        await callbacks.getPorId(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Añade un nuevo deportista a la base de datos
 */
router.post("/nuevoDeportista", async (req, res) => {
    try {
        await callbacks.nuevoDeportista(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Elimina un deportista de la base de datos
 */
router.post("/eliminarDeportista/:idDeportista", async (req, res) => {
    try {
        await callbacks.eliminarDeportista(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Modifica los datos de un deportista
 */
router.post("/editarDeportista", async (req, res) => {
    try {
        await callbacks.editarDeportista(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve los datos del deportista siguiente del deportista con el id pasado
 */
router.get("/siguienteDeportista/:idDeportista", async (req, res) => {
    try {
        await callbacks.siguienteDeportista(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve los datos del deportista anterior del deportista con el id pasado
 */
router.get("/anteriorDeportista/:idDeportista", async (req, res) => {
    try {
        await callbacks.anteriorDeportista(req, res)
    } catch (error) {
        console.log(error);
    }
});




// Exporto el módulo para poder usarlo en server
module.exports = router;
