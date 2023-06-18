import express, { json, urlencoded } from 'express'
import { connect, mongoose } from 'mongoose'
import verifyToken from './routes/validate-token.js'
import cors from 'cors'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.js';
import characterRoutes from './routes/character.js';
import itemsRoutes from './routes/items.js';
import monsterRoutes from './routes/monster.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
mongoose.set('strictQuery', true);
const uri = `mongodb://app:pass@localhost:27017/recuperacion?authMechanism=DEFAULT`;
connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((e) => {
    console.log('Database error', e)
  })

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/api/character', characterRoutes);
app.use('/api/item', itemsRoutes);
app.use('/api/monster', monsterRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'My Auth Api Rest' })
})

const PORT = 8000
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
