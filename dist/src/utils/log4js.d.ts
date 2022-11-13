export declare enum LoggerLevel {
    ALL = "ALL",
    MARK = "MARK",
    TRACE = "TRACE",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL",
    OFF = "OFF"
}
export declare class ContextTrace {
    readonly context: string;
    readonly path?: string;
    readonly lineNumber?: number;
    readonly columnNumber?: number;
    constructor(context: string, path?: string, lineNumber?: number, columnNumber?: number);
}
export declare class Logger {
    static trace(...args: any[]): void;
    static debug(...args: any[]): void;
    static log(...args: any[]): void;
    static info(...args: any[]): void;
    static warn(...args: any[]): void;
    static warning(...args: any[]): void;
    static error(...args: any[]): void;
    static fatal(...args: any[]): void;
    static access(...args: any[]): void;
    static getStackTrace(deep?: number): string;
}
