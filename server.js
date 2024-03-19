import 'dotenv/config';
import express from 'express';
import JoyasRouter from './routes/joyas.route.js';
import { logger } from 'logger-express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger());

app.use(JoyasRouter);

app.listen(PORT, () =>{
    console.log(`Server corriendo en http://localhost:${PORT}`);
});
