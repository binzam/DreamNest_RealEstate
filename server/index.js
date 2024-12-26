import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { clearAllProperties } from './utils/clearAllProperties.js';
import { uploadProperties } from './utils/propertiesDataExporter.js';

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/uploads', express.static(path.resolve('uploads')));

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
app.use('/api/user', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to database');
    const url = `http://localhost:${process.env.PORT}`;
    app.listen(process.env.PORT, () => {
      console.log(`App listening on: \x1b[32m%s\x1b[0m`, url);
    });
  })
  .catch((error) => {
    console.log(error);
  });
