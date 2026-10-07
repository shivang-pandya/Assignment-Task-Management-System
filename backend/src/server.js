import app from './app.js';
import { config } from './config/index.js';

const PORT = config.PORT;

const server = app.listen(PORT, () => {
    console.log(`
  =================================
  🚀 Server running in ${config.NODE_ENV} mode
  📡 Listening on port ${PORT}
  📄 Swagger docs available at http://localhost:${PORT}/api-docs
  =================================
    `);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
