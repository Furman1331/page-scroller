export type LoggerType = "info" | "error" | "warn";

export interface useLoggerReturn {
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    createMessage: (message: string, type?: LoggerType) => string;
}