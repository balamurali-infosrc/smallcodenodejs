const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;

const swaggerDocument = YAML.load('./swagger.yaml');

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Import controller correctly
const userController = require('./controllers/userController');
console.log("User Controller:", userController); // Debug

// ✅ Register routes correctly
app.get('/users', (req, res) => userController.getUsers(req, res));
app.post('/users', (req, res) => userController.createUser(req, res));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`✅ Swagger Docs → http://localhost:${port}/api-docs`);
});
