import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});
