import fastify from 'fastify';
import routes from "./src/routes/routes";
import {AppDataSource} from "./src/configuration/appDataSource";

const app = fastify({ logger: true });

app.register(routes);

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