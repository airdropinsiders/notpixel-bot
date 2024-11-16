  import { createLogger, format, transports } from 'winston';
  import a6_0x1f495e from 'fs';
  const {
    combine,
    timestamp,
    printf,
    colorize
  } = format;
  const customFormat = printf(({
    level: _0xed646a,
    message: _0x1c5b84,
    timestamp: _0x582949
  }) => {
    return _0x582949 + " [" + _0xed646a + "]: " + _0x1c5b84;
  });
  class Logger {
    constructor() {
      this.logger = createLogger({
        'level': 'debug',
        'format': combine(timestamp({
          'format': "YYYY-MM-DD HH:mm:ss"
        }), colorize(), customFormat),
        'transports': [new transports.File({
          'filename': 'log/app.log'
        })],
        'exceptionHandlers': [new transports.File({
          'filename': 'log/app.log'
        })],
        'rejectionHandlers': [new transports.File({
          'filename': 'log/app.log'
        })]
      });
    }
    ['info'](_0x5ded6f) {
      this.logger.info(_0x5ded6f);
    }
    ['warn'](_0xa92c29) {
      this.logger.warn(_0xa92c29);
    }
    ['error'](_0x4af9bd) {
      this.logger.error(_0x4af9bd);
    }
    ['debug'](_0xe74b65) {
      this.logger.debug(_0xe74b65);
    }
    ['setLevel'](_0x152678) {
      this.logger.level = _0x152678;
    }
    ['clear']() {
      a6_0x1f495e.truncate('log/app.log', 0x0, _0x442142 => {
        if (_0x442142) {
          this.logger.error("Failed to clear the log file: " + _0x442142.message);
        } else {
          this.logger.info("Log file cleared");
        }
      });
    }
  }
  export default new Logger();