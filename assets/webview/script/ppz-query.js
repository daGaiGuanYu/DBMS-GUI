import './iconfont.js'

/** @returns {HTMLElement} */
export default function $(selector) {
  if(typeof selector == 'string')
    return document.querySelector(selector)
  return selector
}

import { El, Section, Span, Div, Icon, Button } from './el/index.js'
import Form from './el/form/index.js'
import { Table, THead, TBody } from './el/table/index.js'

$.El = El
$.Section = Section
$.Div = Div
$.Span = Span
$.Icon = Icon
$.Button = Button

$.Form = Form
$.Input = function(options) {
  const $el = $.El('input')
  for(const key in options)
    $el[key] = options[key]
  return $el
}

$.Table = Table
$.THead = THead
$.TBody = TBody

$.clone = function(data) {
  const result = {}
  for(let k in data)
    result[k] = data[k]
  return result
}

// 可优化
$.msg = function(messageType, handler) {
  window.addEventListener('message', function({ data: { type, data }}) {
    if(messageType == type) {
      console.debug('收到消息', type, data)
      handler(data)
    }
  })
}

import Loading from './loading.js'
$.loading = Loading($)

import Request, { Api } from '../../../lib/request/client.js'
$.request = Request({
  vscode: VSCODE,
  beforeSend({ options }) {
    if(!options.noLoading)
      $.loading.show()
  },
  afterReturn(res, { options }) {
    if(!options.noLoading)
      $.loading.hide()
  }
})
$.api = Api($.request)

$.noty = new Proxy({}, {
  get(target, type) {
    return (msg, ...btns) => $.api.noty({ type, msg, btns }, {
      timeout: 0,
      noLoading: true
    })
  }
})


$.isNil = function(target) {
  if(target == null || target == undefined)
    return true
  return false
}
$.isNumber = function(target) {
  return typeof target == 'number' && !isNaN(target)
}
$.isInt = function(target) {
  return $.isNumber(target) && target % 1 == 0
}
$.isUnsignedInt = function(target) {
  return $.isInt(target) && target > 0
}

$.emptyObj = function(target) {
  for(const key in target)
    delete target[key]
}

$.getOldSetNow = new function() {
  let old = undefined
  return function(now) {
    const _old = old
    old = now
    return _old
  }
}

$.run = function(f) {
  f()
}