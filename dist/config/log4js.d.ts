declare const log4jsConfig: {
    appenders: {
        console: {
            type: string;
        };
        access: {
            type: string;
            filename: string;
            alwaysIncludePattern: boolean;
            pattern: string;
            daysToKeep: number;
            numBackups: number;
            category: string;
            keepFileExt: boolean;
        };
        app: {
            type: string;
            filename: string;
            alwaysIncludePattern: boolean;
            layout: {
                type: string;
                pattern: string;
            };
            pattern: string;
            daysToKeep: number;
            numBackups: number;
            keepFileExt: boolean;
        };
        errorFile: {
            type: string;
            filename: string;
            alwaysIncludePattern: boolean;
            layout: {
                type: string;
                pattern: string;
            };
            pattern: string;
            daysToKeep: number;
            numBackups: number;
            keepFileExt: boolean;
        };
        errors: {
            type: string;
            level: string;
            appender: string;
        };
    };
    categories: {
        default: {
            appenders: string[];
            level: string;
        };
        info: {
            appenders: string[];
            level: string;
        };
        access: {
            appenders: string[];
            level: string;
        };
        http: {
            appenders: string[];
            level: string;
        };
    };
    pm2: boolean;
    pm2InstanceVar: string;
};
export default log4jsConfig;
