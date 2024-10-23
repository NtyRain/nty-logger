export enum logType {
  SUCCESS = "SUCCESS",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}
export const stylesMap = {
  textBold: ["\x1B[1m", "\x1B[22m"],
  green: ["\x1B[32m", "\x1B[39m"],
  yellow: ["\x1B[93m", "\x1B[39m"],
  red: ["\x1B[31m", "\x1B[39m"],
  blue: ["\x1B[34m", "\x1B[39m"],
  white: ["\x1B[37m", "\x1B[39m"],
  magenta: ["\x1B[35m", "\x1B[39m"],
};

export const logTypeColors: { [key in logType]: string } = {
  [logType.SUCCESS]: stylesMap.green[0],
  [logType.INFO]: stylesMap.blue[0],
  [logType.WARN]: stylesMap.yellow[0],
  [logType.ERROR]: stylesMap.red[0],
  [logType.DEBUG]: stylesMap.magenta[0],
};

export const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};
