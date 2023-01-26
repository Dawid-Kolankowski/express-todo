import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import logger from './utils/logger';
import userRouter from './routes/user.router';

const port = config.get<number>('port');
const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connectDB();
});
