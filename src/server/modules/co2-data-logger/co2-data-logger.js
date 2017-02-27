import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

function ensureFileFactory(log) {

    return (fileName, callback) => {

        mkdirp(path.dirname(fileName), (err) => {

            if (err) {

                log.error('Unable to create data directory for CO2 history log file')

                return callback(err)

            }

            fs.access(fileName, fs.constants.W_OK, (err) => {

                if (err) {

                    fs.writeFile(fileName, '', (err) => {

                        if (err) {

                            return callback(err)

                        }

                        log.debug('New file created')

                        return callback()
                    })

                }

                return callback()

            })

        })

    }

}


export async function co2DataLogger(deps) {

    const { logger, env } = deps
    const log = logger.getLogger('co2-history')
    const ensureFile = ensureFileFactory(log)
    const filename = env.HISTORY_FILENAME

    log.info('co2DataLogger component successfully inited')

    return {
        async fetch() {

            return new Promise((resolve) => {

                fs.readFile(filename, 'utf8', (err, data) => {

                    if (err) {

                        log.warn('Unable to read co2 history log file')

                        return resolve([])

                    }

                    resolve(
                        data.split('\n')
                            .filter(line => !!line)
                            .map(line => {

                                try {

                                    return JSON.parse(line)

                                } catch(err) {

                                    return log.warn('Unable to parse co2 history entry: "%s"', line)

                                }

                            })
                    )

                })


            })

        },
        async push(data) {

            return new Promise((resolve, reject) => {

                ensureFile(filename, (err) => {

                    if (err) {

                        return reject(err)

                    }

                    const serializedData = `${JSON.stringify(data)}\n`

                    fs.appendFile(filename, serializedData, 'utf8', (err) => {

                        if (err) {

                            return reject(err)

                        }

                        log.info('CO2 history file was updated')

                        return resolve()

                    })

                })


            })

        }
    }

}

co2DataLogger.componentName = 'co2DataLogger'
