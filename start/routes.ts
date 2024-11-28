/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from './kernel.js'
import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import FileUploadController from '#controllers/file_uploads_controller'
import AdminController from '#controllers/admin_controller'
import GameController from '#controllers/games_controller'

router.post('/api/v1/register', [AuthController, 'register']).as('auth.register')
router.post('/api/v1/login', [AuthController, 'login']).as('auth.login').use(middleware.isActive())
router.post('/api/v1/renvio', [AuthController, 'renvio']).as('auth.renvio')


    router.get('/', async () => {
      return {
        hello: 'world',
      }
    }) // asemos un grupo de rutas para los usuarios autenticados
    router
      .group(() => {
        router.post('/imagen', [FileUploadController, 'upload']).as('fileUpload.upload')
        router.get('/imagen', [FileUploadController, 'ver']).as('fileUpload.ver')
      })
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )

   

    router.get('/activate-account', [AuthController, 'activateAccount']).as('auth.activateAccount')

    router
      .post('/activar', [AdminController, 'cambiarloajugador'])
      .as('auth.logout')
      // .use(middleware.auth())
      // .use(middleware.isAdmin())
      // .use(middleware.isinactive())

      router
      .post('/desactivar', [AdminController, 'desactivarjugador'])
      // .use(middleware.auth())
      // .use(middleware.isAdmin())
      // .use(middleware.isinactive())


    router
      .post('/game', [GameController, 'createGame'])
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/join/:id', [GameController, 'joinGame'])
      .where('id', '[0-9]+')
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/consultar', [GameController, 'Consultar'])
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/barcos/:id', [GameController, 'placeShips'])
      .where('id', '[0-9]+')
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/atacar/:id', [GameController, 'attack'])
      .where('id', '[0-9]+')
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/consultaratakes/:id', [GameController, 'consultaratakes'])
      .where('id', '[0-9]+')
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/partidos', [GameController, 'consultarpartidosdeljugador'])
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())

    router
      .post('/abandonar/:id', [GameController, 'abandonar'])
      .where('id', '[0-9]+')
      // .use(middleware.auth())
      // .use(middleware.isUser())
      // .use(middleware.isinactive())


    router
      .get('/gamesview', [GameController, 'listGames'])
      // .use(middleware.auth())
      // .use(middleware.isAdmin())
      // .use(middleware.isinactive())

    router
      .get('/gamesview/:id', [GameController, 'showGame'])
      .where('id', '[0-9]+')
      // .use(middleware.auth())
      // .use(middleware.isAdmin())
      // .use(middleware.isinactive())



