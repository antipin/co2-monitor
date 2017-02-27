import inert from 'inert'
import { makeRoutes } from './static-files-server.routes'

export function staticFilesServer(deps) {

    const { hapi, logger } = deps
    const log = logger.getLogger('static-files-server')

    hapi.register(inert, (err) => {

        if (err) {

            log.error('Error occurred while inert hapi plugin registration', err)
            throw err

        }

        const routes = makeRoutes()

        hapi.route(routes)

        log.info('staticFilesServer component successfully inited')

    })

}

staticFilesServer.componentName = 'staticFilesServer'
