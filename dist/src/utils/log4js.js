"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ContextTrace = exports.LoggerLevel = void 0;
const Path = require("path");
const Log4js = require("log4js");
const Util = require("util");
const Moment = require("moment");
const StackTrace = require("stacktrace-js");
const chalk_1 = require("chalk");
const log4js_1 = require("../../config/log4js");
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["ALL"] = "ALL";
    LoggerLevel["MARK"] = "MARK";
    LoggerLevel["TRACE"] = "TRACE";
    LoggerLevel["DEBUG"] = "DEBUG";
    LoggerLevel["INFO"] = "INFO";
    LoggerLevel["WARN"] = "WARN";
    LoggerLevel["ERROR"] = "ERROR";
    LoggerLevel["FATAL"] = "FATAL";
    LoggerLevel["OFF"] = "OFF";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
class ContextTrace {
    constructor(context, path, lineNumber, columnNumber) {
        this.context = context;
        this.path = path;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }
}
exports.ContextTrace = ContextTrace;
Log4js.addLayout('Awesome-nest', (logConfig) => {
    return (logEvent) => {
        let moduleName = '';
        let position = '';
        const messageList = [];
        logEvent.data.forEach((value) => {
            if (value instanceof ContextTrace) {
                moduleName = value.context;
                if (value.lineNumber && value.columnNumber) {
                    position = `${value.lineNumber},${value.columnNumber}`;
                }
                return;
            }
            if (typeof value !== 'string') {
                value = Util.inspect(value, false, 3, true);
            }
            messageList.push(value);
        });
        const messageOutput = messageList.join(' ');
        const positionOutput = position ? `[${position}]` : '';
        const typeOutput = `[${logConfig.type}]${logEvent.pid.toString()} - `;
        const dateOutput = `${Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
        const moduleOutput = moduleName ? `[${moduleName}]` : '[LoggerService]';
        let levelOutput = `[${logEvent.level}]${messageOutput}`;
        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutput = chalk_1.default.green(levelOutput);
                break;
            case LoggerLevel.INFO:
                levelOutput = chalk_1.default.cyan(levelOutput);
                break;
            case LoggerLevel.WARN:
                levelOutput = chalk_1.default.yellow(levelOutput);
                break;
            case LoggerLevel.ERROR:
                levelOutput = chalk_1.default.red(levelOutput);
                break;
            case LoggerLevel.FATAL:
                levelOutput = chalk_1.default.hex('#DD4C35')(levelOutput);
                break;
            default:
                levelOutput = chalk_1.default.grey(levelOutput);
                break;
        }
        return `${chalk_1.default.green(typeOutput)} ${dateOutput} ${chalk_1.default.yellow(moduleOutput)}`;
    };
});
Log4js.configure(log4js_1.default);
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;
class Logger {
    static trace(...args) {
        logger.trace(Logger.getStackTrace(), ...args);
    }
    static debug(...args) {
        logger.debug(Logger.getStackTrace(), ...args);
    }
    static log(...args) {
        logger.info(Logger.getStackTrace(), ...args);
    }
    static info(...args) {
        logger.info(Logger.getStackTrace(), ...args);
    }
    static warn(...args) {
        logger.warn(Logger.getStackTrace(), ...args);
    }
    static warning(...args) {
        logger.warn(Logger.getStackTrace(), ...args);
    }
    static error(...args) {
        logger.error(Logger.getStackTrace(), ...args);
    }
    static fatal(...args) {
        logger.fatal(Logger.getStackTrace(), ...args);
    }
    static access(...args) {
        const loggerCustom = Log4js.getLogger('http');
        loggerCustom.info(Logger.getStackTrace(), ...args);
    }
    static getStackTrace(deep = 2) {
        const stackList = StackTrace.getSync();
        const stackInfo = stackList[deep];
        const lineNumber = stackInfo.lineNumber;
        const columnNumber = stackInfo.columnNumber;
        const fileName = stackInfo.fileName;
        const basename = Path.basename(fileName);
        return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log4js.js.map