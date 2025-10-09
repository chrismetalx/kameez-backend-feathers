// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
// import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
// import { LocalStrategy } from '@feathersjs/authentication-local'

// export const authentication = app => {
//   const authentication = new AuthenticationService(app)

//   authentication.register('jwt', new JWTStrategy())
//   authentication.register('local', new LocalStrategy())

//   app.use('authentication', authentication)
// }

import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';

export const authentication = app => {
  // 1. Crear y registrar la instancia de AuthenticationService
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  // Registrar el servicio en la aplicación
  app.use('authentication', authentication);

  // 2. Definir el hook (tu función permanece igual)
  const addUserToAuthResponse = () => {
    return async context => {
      // ... (tu lógica de hook, la cual es correcta) ...
      const result = context.result || {}
      const userId =
        result?.authentication?.payload?.sub ||
        context.params?.authentication?.payload?.sub ||
        context.params?.user?.id ||
        result?.authentication?.payload?.userId

      if (!userId) {
        return context
      }

      try {
        const usersService = context.app.service('users')
        const user = await usersService.get(userId, { params: { query: {} } })

        if (user && typeof user === 'object') {
          const safeUser = { ...user }
          delete safeUser.password
          delete safeUser.salt
          // Borra otros campos sensibles según tu modelo

          context.result = {
            ...result,
            user: safeUser
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching user for auth response', err)
      }

      return context
    };
  };

  // 3. Aplicar el hook al servicio 'authentication'
  // Es mejor usar app.service('nombre-del-servicio').hooks()
  app.service('authentication').hooks({
    after: {
      create: [addUserToAuthResponse()]
    }
  });
};
