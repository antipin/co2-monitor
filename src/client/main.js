(function(global) {

    const app = Object.create(null)

    app.init = function() {

        const socket = io()
        const [ co2Canvas ] = document.getElementsByClassName('co2-chart')
        const co2CanvasContext = co2Canvas.getContext('2d')
        const co2Color = 'rgba(0, 143, 0, 0.9)'
        const co2ColorPoint = 'rgba(0, 143, 0, 0.6)'
        const tempColor = 'rgba(20, 92, 255, 0.9)'
        const tempColorPoint = 'rgba(20, 92, 255, 0.6)'
        const co2Data = {
            labels: [],
            datasets: [
                {
                    label: 'CO2',
                    yAxisID: "y-axis-1",
                    data: [],
                    fill: false,
                    borderColor: co2Color,
                    borderWidth: 1,
                    pointBackgroundColor: co2ColorPoint,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                },
                {
                    label: 'Temperature',
                    yAxisID: "y-axis-2",
                    data: [],
                    fill: false,
                    borderColor: tempColor,
                    borderWidth: 1,
                    pointBackgroundColor: tempColorPoint,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                }
            ]
        }
        const co2Chart = new Chart(co2CanvasContext, {
            type: 'line',
            data: co2Data,
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                hour: 'hh:mm',
                                minute: 'hh:mm'
                            },
                            unit: 'hour'
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: "right",
                        id: "y-axis-1",
                        ticks: {
                            max: 1400,
                            min: 400,
                            stepSize: 100,
                            fontColor: 'rgba(0, 143, 0, 0.9)',
                        },
                        gridLines: {
                            display: false
                        },

                    }, {
                        type: 'linear',
                        display: true,
                        position: "left",
                        id: "y-axis-2",
                        ticks: {
                            max: 30,
                            min: 0,
                            stepSize: 5,
                            fontColor: 'rgba(20, 92, 255, 0.6)',
                        },
                        gridLines: {
                            display: false
                        },
                    }],
                }
            }
        })

        let isHistoryReceived = false

        socket.on('data-history', (dataHistory) => {

            isHistoryReceived = true

            dataHistory.forEach(data => {

                co2Data.datasets[0].data.push(data.co2)
                co2Data.datasets[1].data.push(data.temp)
                co2Data.labels.push(data.timestamp)

            })

            co2Chart.update();

        })

        socket.on('data-point', (point) => {

            if (isHistoryReceived) {

                co2Data.datasets[0].data.push(point.co2)
                co2Data.datasets[1].data.push(point.temp)
                co2Data.labels.push(point.timestamp)

                co2Chart.update();

            }

        })

    }

    global.app = app
    global.onload = app.init

}(window))
