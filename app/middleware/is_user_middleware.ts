import type { HttpContext } from '@adonisjs/core/http'

export default class IsUserMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    try {
      // Obtén el usuario autenticado
      const user = await auth.authenticate()

      // Verifica si el rol del usuario es 2 (Usuario común) o 3 (Administrador)
      if (user.role_id !== 2 && user.role_id !== 3) {
        return response.forbidden({ message: 'No tienes permiso para acceder a esta ruta.' })
      }

      // Si el rol es correcto, continúa con la solicitud
      await next()
    } catch (error) {
      return response.unauthorized({ message: 'No estás autorizado.' })
    }
  }
}