import fastify from 'fastify';
import routes from "./src/routes/routes";
import {AppDataSource} from "./src/configuration/appDataSource";
import cors from '@fastify/cors'

const app = fastify({ logger: true });

app.register(routes);
app.register(cors, {
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    cacheControl: 604800,
    origin: 'http://localhost:4200'
})

const initialize = async () => {
  await app.after()
  await AppDataSource.initialize(app);
  AppDataSource.getInstance().initialize()
      .then(() => {
        console.log('AppDataSource connection initialized');
      })
      .catch((error) => {
        console.log(' Could NOT initialize AppDataSource\n', error)
      })
  app.listen({host: "0.0.0.0", port: 3000}, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

initialize();