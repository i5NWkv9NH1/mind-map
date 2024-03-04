import logdown from 'logdown'

export const StateLogger = logdown('state', { markdown: true })
export const WatchLogger = logdown('watcher')
export const Logger = logdown('logger')
