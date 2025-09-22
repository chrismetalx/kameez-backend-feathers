// Para más información sobre este archivo, consulta https://dove.feathersjs.com/guides/cli/databases.html
import { MongoClient } from 'mongodb'

export const mongodb = app => {
  // Obtiene la cadena de conexión de la variable de entorno MONGODB_URI
  const connection = process.env.MONGODB_URI

  // Si la variable no está definida, muestra un error y detiene la aplicación.
  if (!connection) {
    console.error("Error: La variable de entorno MONGODB_URI no está configurada.");
    process.exit(1);
  }

  // Extrae el nombre de la base de datos de la URL de conexión
  const database = new URL(connection).pathname.substring(1)

  // Conecta a la base de datos y la expone en la aplicación
  const mongoClient = MongoClient.connect(connection).then(client => client.db(database))

  app.set('mongodbClient', mongoClient)
}
