// Settings.js

import Config from './Config'
import url from 'fast-url-parser'
url.queryString = require('querystringparser')

let enabled = true

const reload = () => {
  if (!enabled) {
    return
  }
  window.location.href = window.location.origin + window.location.pathname + '?config=' + JSON.stringify(Config)
}

const refresh = () => {
  if (!enabled) {
    return
  }
  window.history.pushState('experiment', 'Title', window.location.origin + window.location.pathname + '?config=' + JSON.stringify(Config))
}

const reset = () => {
  if (!enabled) {
    return
  }
  window.location.href = window.location.origin + window.location.pathname
}

let delayIndex = -1

const delayReload = () => {
  if (!enabled) {
    return
  }
  window.clearTimeout(delayIndex)

  delayIndex = window.setTimeout(() => {
    window.location.href = window.location.origin + window.location.pathname + '?config=' + JSON.stringify(Config)
  }, 500)
}

const init = (mEnabled = true) => {
  enabled = mEnabled
  const parsed = url.parse(window.location.search, true)

  if (parsed.query.config) {
    const oConfig = JSON.parse(parsed.query.config)

    for (const key in oConfig) {
      Config[key] = oConfig[key]
    }
  }

  console.log('Config :', Config)
  refresh()
}

export default {
  enabled,
  reset,
  reload,
  refresh,
  delayReload,
  init
}
