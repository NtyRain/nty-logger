import { stylesMap, logType, logTypeColors } from "./constant";
import { ILogger } from "./interface";
import { formatDate, formatMessage, getLogWithLocation } from "./util";

const PADDING = {
  TYPE: 18,
  LOCATION: 20,
};
export class Logger implements ILogger {
  private log(type: logType, emoji: string, ...msg: any[]) {
    const timestamp = formatDate(new Date());
    const location = getLogWithLocation();
    const bold = stylesMap.textBold[0];
    const timestampText = logTypeColors[logType.SUCCESS] + timestamp;

    const typeText = (bold + logTypeColors[type] + type).padEnd(PADDING.TYPE);
    const locationText =
      logTypeColors[logType.INFO] +
      `[${location}]`.padEnd(PADDING.LOCATION) +
      stylesMap.white[1];
    const lineBold = bold + logTypeColors[logType.ERROR] + "|";
    let messageText = formatMessage(...msg);
    // msg.forEach((item) => {
    //   if (typeof item == "object") {
    //     console.log(item);
    //   } else {
    //     messageText += logTypeColors[type] + item;
    //   }
    // });

    const message = [
      timestampText,
      lineBold,
      typeText,
      lineBold,
      locationText,
      emoji + "  ",
      messageText,
      stylesMap.white[1],
    ].join(" ");

    console.log(message);
  }
  success(...message: string[]) {
    this.log(logType.SUCCESS, "🍀", ...message);
  }

  info(...message: string[]) {
    this.log(logType.INFO, "🔍", ...message);
  }

  error(...message: string[]) {
    this.log(logType.ERROR, "🚨", ...message);
  }

  warn(...message: string[]) {
    this.log(logType.WARN, "⏰", ...message);
  }

  debug(...message: string[]) {
    this.log(logType.DEBUG, "🐛", ...message);
  }
}
