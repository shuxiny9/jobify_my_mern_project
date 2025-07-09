import 'express-async-errors'; // 处理异步错误
import * as dotenv from 'dotenv';
// 首先配置环境变量
dotenv.config();
import express from 'express';
// 创建 Express 应用
const app = express();
// 连接到 MongoDB 数据库
import mongoose from 'mongoose';
// 解析 cookie 中间件
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// 条件性添加 morgan（避免重复）
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);



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


