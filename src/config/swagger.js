import swaggerJSDoc from 'swagger-jsdoc';

export function createSwaggerSpec() {
  return swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SmartPrice API',
        version: '1.0.0',
        description:
          'REST API for comparing product offers across multiple marketplaces with normalized product metadata.',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server',
        },
      ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
  });
}
