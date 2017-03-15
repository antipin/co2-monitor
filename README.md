CO2 Monitor
===========

The goal of this project is a program that takes data from CO2 meter and plots it in real time to a graph


How does it look like?
----------------------

This project works with this device:

![Device](/docs/images/device.png?raw=true)

UI example:

![Screenshot](/docs/images/ui-screenshot.jpg?raw=true)

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
 * ``npm run start`` (or, if you need sudo ``NODE_ENV=production sudo node ./dist/server/bin/app.js``)
 * ``http://localhost:8001``

If there are any errors concerning lack of some library, I guess you should build [CO2mon](https://github.com/dmage/co2mon) by yourself
and replace bundled binary with builded one.

RaspberryPi
-----------

If you have issues on RaspberryPi, try to run app with sudo by:
``NODE_ENV=production sudo node ./dist/server/bin/app.js`` command.

Troubleshooting
---------------

### ``Syntax error: "(" unexpected`` error

If yo see the following error
```
co2-sensor-data-stream.ERROR: /home/pi/co2-monitor/dist/server/modules/co2-sensor-data-stream/lib/co2mond: 1: /home/pi/co2-monitor/dist/server/modules/co2-sensor-data-stream/lib/co2mond: Syntax error: "(" unexpected
```
try to run app with sudo:
```
NODE_ENV=production sudo node ./dist/server/bin/app.js
```
