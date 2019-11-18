import bunyan from 'bunyan';
import bunyanDebugStream from 'bunyan-debug-stream';
import { format } from 'date-fns';

// we don't import the config here because we want to log early
const NODE_ENV = process.env.NODE_ENV || 'development';

// don't log for testing environment
const logLevel =
  process.env.LOG_LEVEL || (process.env.NODE_ENV === 'test' ? bunyan.FATAL : bunyan.INFO);
export const logManager = {
  getLogger(name: string) {
    const logName = name || ' ';
    const streams: bunyan.Stream[] = [];

    streams.push({
      level: logLevel as any,
      type: 'raw',
      stream: bunyanDebugStream({
        colors: {
          info: 'white',
          debug: 'grey',
          error: ['red'],
        },
        prefixers: {
          // add prefixers here
        },
        showDate: (time: any) => {
          return format(time, NODE_ENV === 'production' ? '' : 'HH:mm:ss.ms');
        },
        showPid: false,
      }),
    });

    const logger = bunyan.createLogger({
      name: logName,
      streams,
    });

    return logger;
  },
};

export const log = logManager.getLogger('root');
