import { compose, logger, hapi } from 'appi'
import { staticFilesServer, co2SensorDataStream, co2DataLogger, co2History, co2SocketServer } from './modules'

const env = {
    HISTORY_FILENAME: 'data/history.log'
}

/**
 * Initializes application.
 * @returns {App} App instance
 */
export async function composeApp() {

    return await compose([
        {
            component: env,
            name: 'env',
            deps: [],
        },
        {
            component: logger,
            deps: [ env ],
        },
        {
            component: hapi,
            deps: [ logger, env ],
        },
        {
            component: staticFilesServer,
            deps: [ hapi, logger ],
        },
        {
            component: co2SensorDataStream,
            deps: [ hapi, logger ],
        },
        {
            component: co2DataLogger,
            deps: [ logger, env ],
        },
        {
            component: co2History,
            deps: [ hapi, logger, co2DataLogger, co2SensorDataStream ],
        },
        {
            component: co2SocketServer,
            deps: [ hapi, logger, co2History, co2SensorDataStream ],
        },
    ])

}


