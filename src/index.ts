import express from 'express';
const app = express();
const port = 3000;
import path from 'path';
const __dirname = path.resolve();

app.use(express.static(__dirname + '/dist/assets/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/' + 'index.html');
});

app.get('/api', (req, res) => {
  res.json({ message: 'You are listening from express server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err?) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
