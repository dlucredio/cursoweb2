import express from 'express';
import cors from 'cors'; // Just use in development. In production, set policies correctly!

import gamblerRouter from './routes/gamblerRouter.js';
import betRouter from './routes/betRouter.js';

const app = express();

const port = 5000;

app.use(cors()); // Just use in development. In production, set policies correctly!
app.use(express.json());
app.use('/gambler', gamblerRouter);
app.use('/bet', betRouter);

app.listen(port, () => { console.log('Listening on port ' + port); });