import { colors } from "./constant";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getLogWithLocation = () => {
  const stack = new Error().stack;
  if (!stack) return "unknown:0:0";
  const lines = stack.split("\n");
  const targetLine = 4;
  if (lines.length > targetLine) {
    const targetText = lines[targetLine];
    const match = targetText.match(/\((.*?):(\d+):/);
    if (match) {
      const filePath = match[1];
      const fileName = filePath.split(/[\/\\]/).pop() || filePath;
      return `${fileName}:${match[2]}`;
    }
  }
  return "unknown:0:0";
};

export const formatItem = (item: any): string => {
  if (item === null) return `${colors.red}null${colors.reset}`;
  if (item === undefined) return `${colors.red}undefined${colors.reset}`;

  if (typeof item === "object") {
    if (Array.isArray(item)) {
      return formatArray(item);
    }
    return formatObject(item);
  }

  if (typeof item === "string") {
    return `${colors.green}"${item}"${colors.reset}`;
  }
  if (typeof item === "number") {
    return `${colors.cyan}${item}${colors.reset}`;
  }
  return String(item);
};

const defaultOptions = {
  indent: 2,
  colors: true,
};

export const formatObject = (obj: object): string => {
  const indent = " ".repeat(defaultOptions.indent);
  const entries = Object.entries(obj);

  const formattedEntries = entries.map(([key, value]) => {
    const formattedValue = formatValue(value);
    return `${indent}${colors.cyan}${key}${colors.reset}: ${formattedValue}${indent}`;
  });

  return `{${formattedEntries.join(",")}}`;
};

const formatArray = (arr: any[]): string => {
  const indent = " ".repeat(defaultOptions.indent);
  const formattedItems = arr.map((item) => {
    const formatted = formatItem(item);
    return `${indent}${formatted}`;
  });
  return `${colors.yellow}\n[\n${formattedItems.join(",\n")}\n]${
    colors.reset
  }\n`;
};

const formatValue = (value: any): string => {
  if (value === null) return `${colors.red}null${colors.reset}`;
  if (value === undefined) return `${colors.red}undefined${colors.reset}`;

  switch (typeof value) {
    case "string":
      return `${colors.green}"${value}"${colors.reset}`;
    case "number":
      return `${colors.cyan}${value}${colors.reset}`;
    case "boolean":
      return `${colors.yellow}${value}${colors.reset}`;
    case "object":
      if (Array.isArray(value)) {
        return formatArray(value);
      }
      return formatObject(value);
    default:
      return String(value);
  }
};

export const formatMessage = (...msg: any[]): string => {
  return msg.map((item) => formatItem(item)).join(" ");
};
