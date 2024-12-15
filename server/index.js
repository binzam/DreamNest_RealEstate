import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';


const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    return res.status(200).json('Welcome DreamNest REALESTATE');
  });

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
