import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import * as mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './router';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { errorMiddleware } from './middleware/error-middleware';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL ?? '',
      collectionName: 'sessions',
      dbName: 'cheburnet',
      autoRemove: 'native',
    }),
    secret: 'blasldlasdl',
    cookie: { maxAge: 90 * 24 * 60 * 60 * 1000, httpOnly: true },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(router);
app.use(errorMiddleware); // errorMiddleware должен быть последним

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? '', {
      dbName: 'cheburnet',
    });
    console.log('MongoDB successfully connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

void start();
