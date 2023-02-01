import { IUser } from './models/user.model';
import 'express-async-errors';
import express, { Request, Response } from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import logger from './utils/logger';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import errorHandlerMiddleware from './middleware/errorHandler';
import notFoundMiddleware from './middleware/notFound';
import isAuthenticated from './middleware/isAuthenticated';

const port = config.get<number>('port');
const app = express();

app.use(express.json());

app.get('/healthcheck', (_req: Request, res: Response) => res.sendStatus(200));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.get('/api/v1/protected', isAuthenticated, (req: Request<IUser, {}, {}>, res: Response) => {
  console.log(res.locals);

  res.send('ok');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connectDB();
});
