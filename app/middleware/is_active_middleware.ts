import type { HttpContext } from '@adonisjs/core/http'

export default class IsActiveMiddleware {
  public async handle({  response, auth }: HttpContext, next: () => Promise<void>) {
    const user = await auth.authenticate()

    // Verifica si esta activado
    if (user.is_active == false) {
      return response.forbidden({ message: 'No estas activado su cuenta.' })
    }

    // Si el rol es correcto, continúa con la solicitud
    await next()
  }
}
