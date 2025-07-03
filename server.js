import * as dotenv from 'dotenv';
// 1. 首先配置环境变量
dotenv.config();
import express from 'express';
// 2. 创建 Express 应用
const app = express();
// 3. 配置中间件
app.use(express.json());
import morgan from 'morgan';
// 4. 条件性添加 morgan（避免重复）
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routers
import jobRouter from './routers/jobRouter.js';

//  其他路由（在 jobRouter 之前）
app.post('/', (req, res) => {
  console.log(req);
  res.send('Hello World');
});

app.use('/api/v1/jobs', jobRouter);

// 404 处理（在所有路由之后）
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// 8. 错误处理中间件（必须在最后）
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

// 9. 启动服务器
const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});