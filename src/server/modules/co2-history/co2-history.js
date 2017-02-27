export async function co2History(deps) {

    const { co2DataLogger, co2SensorDataStream, logger } = deps
    const log = logger.getLogger('co2-history')

    co2SensorDataStream.on('data', async (data) => {

        try {

            await co2DataLogger.push(data)

        } catch (err) {

            throw err

        }

    })

    log.info('co2History component successfully inited')

    return await co2DataLogger.fetch()

}

co2History.componentName = 'co2History'
