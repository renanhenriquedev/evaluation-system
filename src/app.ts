import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import reviewRoutes from './routes/reviewRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { initDb } from './services/database';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para tratar JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Avaliações',
      version: '1.0.0',
      description: 'API para gerenciar avaliações de usuários',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Caminhos para os arquivos de rotas e modelos
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicialização do banco de dados
initDb()
  .then(() => {
    console.log('Connected to MongoDB');

    // Use as rotas após a conexão com o banco de dados
    app.use('/reviews', reviewRoutes);
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default app;
