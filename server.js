import 'express-async-errors'; // 处理异步错误
import * as dotenv from 'dotenv';
// 首先配置环境变量
dotenv.config();
import express from 'express';
// 创建 Express 应用
const app = express();
// 配置中间件
app.use(express.json());
// 连接到 MongoDB 数据库
import mongoose from 'mongoose';

import morgan from 'morgan';
// 条件性添加 morgan（避免重复）
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//routers
import jobRouter from './routers/jobRouter.js';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routers/authRouter.js';



app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World');
});


app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/auth', authRouter);


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


