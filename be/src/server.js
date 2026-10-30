const env = require('./config/env');
const { connectDatabase, disconnectDatabase } = require('./config/db');
const app = require('./app');

let server;
let isShuttingDown = false;

async function start() {
  try {
    await connectDatabase();
  } catch {
    console.error('Failed to start server: database connection failed');
    process.exit(1);
  }

  server = app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port} (${env.nodeEnv})`);
  });

  server.on('error', (error) => {
    console.error('Failed to start HTTP server:', error.code || error.name);
    process.exit(1);
  });
}

async function shutdown(signal) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}. Shutting down gracefully.`);

  if (server) {
    await new Promise((resolve) => {
      server.close(() => resolve());
    });
  }

  try {
    await disconnectDatabase();
  } catch {
    console.error('Failed to disconnect from the database cleanly');
  }

  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown('SIGINT').catch(() => process.exit(1));
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM').catch(() => process.exit(1));
});

start();
