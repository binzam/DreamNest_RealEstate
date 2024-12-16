import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve('public/uploads')));
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
  return res.status(200).json('Welcome DreamNest REALESTATE');
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
