import { Readable } from 'stream'
import { resolve } from 'path'
import { spawn } from 'child_process'

class Co2DataStream extends Readable {

    constructor(co2monProcess, log) {

        super({ objectMode: true })

        this.log = log
        this.co2monProcess = co2monProcess

        this.resetDataFrame()

        this.co2monProcess.stdout.on('data', (data) => {

            const { param, value } = Co2DataStream.parseData(data)

            if (this.isDataFrameFulfilled()) {

                this.log.info(`${Date.now()}\t${this.dataFrame.temp}\t${this.dataFrame.co2}`)

                this.push(Object.assign({
                    timestamp: Date.now(),
                }, this.dataFrame))

                this.resetDataFrame()


            }

            this.fillDataFrame(param, value)

        })

        this.co2monProcess.stderr.on('data', (data) => {

            const error = data.toString()

            this.log.error(error)

        })

        this.co2monProcess.on('close', (code) => {

            this.log.info(`child process exited with code ${code}`)

        })

    }

    _read() {

    }

    resetDataFrame() {

        this.dataFrame = { temp: null, co2: null }

    }

    fillDataFrame(param, value) {

        const labelToKeyMap = {
            Tamb: 'temp',
            CntR: 'co2',
        }

        const key = labelToKeyMap[param]
        this.dataFrame[key] = value

    }

    isDataFrameFulfilled() {

        return (this.dataFrame.temp !== null && this.dataFrame.co2 !== null)

    }

    static parseData(data) {

        const input = data.toString().replace(/\n/g, '')
        let [ param, value ] = input.split('\t')

        if (param === 'Tamb') {

            value = parseFloat(value).toFixed(2)

        }

        return {
            param,
            value: parseFloat(value)
        }

    }

}

export async function co2SensorDataStream(deps) {

    const { logger } = deps
    const log = logger.getLogger('co2-sensor-data-stream')
    const co2mond = spawn(resolve(__dirname, 'lib/co2mond'))

    return new Co2DataStream(co2mond, log)

}

co2SensorDataStream.componentName = 'co2SensorDataStream'
