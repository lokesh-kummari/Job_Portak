import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './Routes/user_route.js';
import companyRoute from './Routes/company_route.js';
import jobRoute from './Routes/job_route.js';
import applyRoute from './Routes/application_route.js';

dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200,
    };
app.use(cors(corsOptions));

app.use('/api/user', userRoute);
app.use('/api/company', companyRoute);
app.use('/api/job', jobRoute);
app.use('/api/application', applyRoute);

const Port =  process.env.PORT || 3000;
app.listen(Port, () => {
  connectDB();
  console.log(`Server is running on port ${Port}`);
});