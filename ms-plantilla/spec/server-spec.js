/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
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
        .get('/acercade')
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

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve ¿¿¿ VALOR ESPERADO ??? al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Sandra");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  })
});

//Cada vez que se añade un deportista tendremos que cambiar el valor para comprobarlo
it('Devuelve un vector de tamaño 10 al consultar mediante getTodosDeportistas', (done) => {
  supertest(app)
    .get('/getTodosDeportistas')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
      assert(res.body.data.length === 10);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
});

it('Devuelve Sandra al recuperar los datos de la Persona con id 359174998734143693 mediante getPorId', (done) => {
  supertest(app)
    .get('/getPorId/359174998734143693')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
      assert(res.body.data.hasOwnProperty('nombre'));
      assert(res.body.data.nombre === "Sandra");
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
});

it('Devuelve 42 al recuperar los datos de la Persona con id 359174998734143693 mediante editarDeportista', (done) => {
  const EDAD_TEST = 42
  const persona = {
    id: '359174998734143693',
    edad: EDAD_TEST
  };
  supertest(app)
    .post('/editarDeportista')
    .send(persona)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      
      assert(res.body.data.hasOwnProperty('edad'));
      assert(res.body.data.edad === EDAD_TEST);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
});

it('Devuelve NombreNuevo al recuperar los datos de la nueva Persona añadida mediante nuevoDeportista', (done) => {
  const NOMBRE_TEST = 'NombreNuevo'
  const persona = {
    nombre: NOMBRE_TEST,
    apellidos: 'apellidos_test',
    edad: 10,
    nacimiento: 'nacimiento_test',
    fechaNacimiento: {dia:1, mes:'mes_prueba', año: 1111},
    palmarésMundiales: [1111]
  };
  supertest(app)
    .post('/nuevoDeportista')
    .send(persona)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      
      assert(res.body.data.hasOwnProperty('nombre'));
      assert(res.body.data.nombre === NOMBRE_TEST);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
});

it('Elimina el deportista 361646096739467468 mediante eliminarDeportista', (done) => {
  supertest(app)
    .post('/eliminarDeportista/361646096739467468')
    .expect(200)
    .expect('Content-Type', /json/)
   
    .end((error) => { error ? done.fail(error) : done(); }
    );
});


it('Devuelve un vector de tamaño 11 ya que se ha eliminado 1 persona y se añade otra', (done) => {
  supertest(app)
    .get('/getTodosDeportistas')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
      assert(res.body.data.length === 11);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
});

it('Devuelve 42 como edad, nombre_nuevo como nombre y nacimiento_nuevo como lugar de nacimiento al recuperar los datos de la Persona con id 361646459105312973 mediante editarDeportista', (done) => {
  const EDAD_TEST = 42
  const NOMBRE_TEST = 'nombre_nuevo'
  const NACIMIENTO_TEST = 'nacimiento_nuevo'

  const persona = {
    id: '361646459105312973',
    edad: EDAD_TEST,
    nombre: NOMBRE_TEST,
    nacimiento: NACIMIENTO_TEST
  };
  supertest(app)
    .post('/editarDeportista')
    .send(persona)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      
      assert(res.body.data.hasOwnProperty('edad'));
      assert(res.body.data.edad === EDAD_TEST);
      assert(res.body.data.nombre === NOMBRE_TEST);
      assert(res.body.data.nacimiento === NACIMIENTO_TEST);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
});







