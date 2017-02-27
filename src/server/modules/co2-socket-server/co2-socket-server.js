import SockerIoServer from 'socket.io'

export async function co2SocketServer(deps) {

    const { hapi, co2History, co2SensorDataStream, logger } = deps
    const log = logger.getLogger('co2-socket-server')
    const io = new SockerIoServer(hapi.listener)

    io.on('connection', (socket) => {

        log.info('a user connected')

        socket.emit('data-history', co2History)

        co2SensorDataStream.on('data', (data) => {

            socket.emit('data-point', data)

        })

        socket.on('disconnect', () => {

            log.info('user disconnected')

        })

    })

    log.info('co2SocketServer component successfully inited')

    return io

}

co2SocketServer.componentName = 'co2SocketServer'
