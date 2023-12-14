import express from 'express';
import { config } from 'dotenv';
import 'colors';
import { connectDb } from './config/db.js';
config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDb();

// Routers
import authRouter from './routers/auth.js';
import noutbookRouter from './routers/noteboock.js';
import orderRouter from './routers/order.js';

app.use('/api/notebook/auth', authRouter);
app.use('/api/notebook', noutbookRouter);
app.use('/api/order', orderRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on ${PORT}`.italic));
