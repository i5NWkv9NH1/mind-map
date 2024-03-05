import logdown from 'logdown'

export const Logger = logdown('logger')
export const StateLogger = logdown('state', { markdown: true })
export const WatchLogger = logdown('watcher')
export const EventLogger = logdown('onEvents')
export const FileLogger = logdown('file')
