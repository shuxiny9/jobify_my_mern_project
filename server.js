import 'express-async-errors'; 
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cloudinary from 'cloudinary';

//routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';


//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import userRouter from './routers/userRouter.js';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,  './client/dist',  'index.html'));
});


// 404 处理（在所有路由之后）
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// use the error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}


