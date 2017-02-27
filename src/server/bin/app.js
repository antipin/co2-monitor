#!/usr/bin/env node

import { init } from 'appi'
import { composeApp } from '../app'

(async function() {

    await init(composeApp)

}())
