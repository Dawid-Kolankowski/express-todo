import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 1,
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
});

export default logger;
