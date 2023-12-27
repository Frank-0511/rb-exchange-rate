export const AuthSwagger = {
  login: {
    summary: 'Login',
    description: 'Login a user',
    tags: ['Authentication'],
  },
  body: {
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: "The user's email",
          example: 'example@example.com',
        },
        password: {
          type: 'string',
          description: "The user's password",
          example: 'password',
        },
      },
    },
  },
  response: {
    status: 200,
    description: 'Login successful',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: "The user's JWT token",
            },
            email: {
              type: 'string',
              description: "The user's email",
              example: 'example@example.com',
            },
            name: {
              type: 'string',
              description: "The user's name",
            },
          },
        },
      },
    },
  },
};
