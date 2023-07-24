// import mongoose from 'mongoose'
// import app from './app'
// import config from './config/index'

// async function bootstrap() {
//   try {
//     await mongoose.connect(config.database_url as string)
//     console.log('Database connected successfully')
//     app.listen(config.port, () => {
//       console.log(`Application listening on port ${config.port}`)
//     })
//   } catch (err) {
//     console.log('Failed to connect to database', err)
//   }
// }

// bootstrap()

/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './config';
import app from './app';

import { Server } from 'http';

let server: Server;

process.on('uncaughtException', err => {
  console.error(err);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.info(`🧑‍💻 Database connected successfully`);
    server = app.listen(config.port, () => {
      console.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(`Database is not connected`);
  }
  process.on('unhandledRejection', err => {
    console.log(
      'unhandled Rejection is detected we are closing our server......'
    );
    if (server) {
      server.close(() => {
        console.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.info('SIGTERM IS RECEIVED');
  if (server) {
    server.close();
  }
});
