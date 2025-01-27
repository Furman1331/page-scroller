export type TLoggerType = 'info' | 'error' | 'warn'

export interface ILogger {
	info(message: string): void
	error(message: string): void
	warn(message: string): void
	createMessage: (message: string, type?: TLoggerType) => string
}
