/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Plantilla', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/plantilla/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/plantilla/acercade/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })
});

describe('BBDD Plantilla', () => {
  it(' > Obtener todas los deportistas: debe tener un campo data que es un array de 10 objetos', (done) => {
    supertest(app)
      .get('/plantilla/getTodosDeportistas')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( "Get Todos Plantilla", res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.data.length === 10);

      })
      .end((error) => { error ? done.fail(error) : done() })
  });


  it(' > Obtener un deportista por su id: debe tener un campo data y a su vez un nombre que es Sandra', (done) => {
    supertest(app)
      .get('/plantilla/getPorId/359174998734143693')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        // console.log( "getPorId Persona", res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.data.hasOwnProperty('nombre'));
        assert(res.body.data.nombre === "Sandra");
      })
      .end((error) => { error ? done.fail(error) : done() })
  });

});



