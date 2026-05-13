import express from 'express';
import shortRoutes from './crawler/routes/app.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Crawler URL API',
            version: '1.0.0'
        }
    },
    apis: ['./src/*/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/crawler', shortRoutes);

export default app;