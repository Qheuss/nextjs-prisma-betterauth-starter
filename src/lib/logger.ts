type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogData = Record<string, unknown>;

export class Logger {
  private static instance: Logger;
  private environment: string;

  private constructor() {
    this.environment = process.env.NODE_ENV || 'development';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    data?: LogData,
  ): string {
    const timestamp = new Date().toISOString();
    const logObject = {
      timestamp,
      level,
      message,
      environment: this.environment,
      ...(data || {}),
    };
    return JSON.stringify(logObject);
  }

  info(message: string, data?: LogData): void {
    console.log(this.formatMessage('info', message, data));
  }

  warn(message: string, data?: LogData): void {
    console.warn(this.formatMessage('warn', message, data));
  }

  error(message: string, error?: Error, data?: LogData): void {
    const errorData = error
      ? {
          ...data,
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }
      : data;
    console.error(this.formatMessage('error', message, errorData));
  }

  debug(message: string, data?: LogData): void {
    if (this.environment !== 'production') {
      console.debug(this.formatMessage('debug', message, data));
    }
  }

  payment(status: string, sessionId: string, data?: LogData): void {
    this.info(`Payment ${status}`, { sessionId, ...data });
  }
}

export const logger = Logger.getInstance();
