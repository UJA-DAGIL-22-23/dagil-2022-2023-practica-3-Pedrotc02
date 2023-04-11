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

  it(' > Devuelve 42 al recuperar los datos de la Persona con id 359174998734143693 mediante editarDeportista', (done) => {
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

  it(' > Devuelve 42 como edad, nombre_nuevo como nombre y nacimiento_nuevo como lugar de nacimiento al recuperar los datos de la Persona con id 361646459105312973 mediante editarDeportista', (done) => {
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

  it(' > Devuelve NombreNuevo al recuperar los datos de la nueva Persona añadida mediante nuevoDeportista', (done) => {
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

  it(' > Elimina el deportista 361646096739467468 mediante eliminarDeportista', (done) => {
    supertest(app)
      .post('/eliminarDeportista/361646096739467468')
      .expect(200)
      .expect('Content-Type', /json/)
     
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });
  
  
  it(' > Devuelve un vector de tamaño 11 ya que se ha eliminado 1 persona y se añade otra', (done) => {
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


});



