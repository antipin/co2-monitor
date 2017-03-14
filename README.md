CO2 Monitor
===========

The goal of this project is a program that takes data from CO2 meter and plots it in real time to a graph

Installation
------------

Keep in mind that this project depends on [CO2mon](https://github.com/dmage/co2mon) binary, so the most reliable method
of installation implies building CO2mon on your machine and putting resulting binary to
``./src/server/modules/co2-sensor-data-stream/lib/``.

Good news is that this repo already has bundled binary in it, so all you need is to do following steps:

 * ``brew install hidapi`` (this is a part of installation process of [CO2mon](https://github.com/dmage/co2mon))
 * ``git clone https://github.com/antipin/co2-monitor.git``
 * ``cd ./co2-monitor``
 * ``npm install``
 * ``npm run build-server``
 * ``npm run build-client``
 * ``npm run start``
 * ``http://localhost:8001``

If there are any errors concerning, i guess you should build [CO2mon](https://github.com/dmage/co2mon) by yourself
and replace bundled binary with builded one.