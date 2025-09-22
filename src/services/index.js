import { users } from './users/users.js'
import { products } from './products/products.js'
export const services = app => {
  app.configure(users)

  app.configure(products)

  // All services will be registered here
}
