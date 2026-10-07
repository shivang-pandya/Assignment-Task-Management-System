import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/index.js';
import taskRoutes from './routes/task.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { swaggerSpec } from './swagger.js';

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

// Logging
if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(requestLogger);

// Rate limiting: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() }));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/tasks', taskRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
