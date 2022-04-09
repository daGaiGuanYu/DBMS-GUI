import $ from '../../script/ppz-query.js'

const header = new function() {
  this.$el = $.El('header', '', [
    $.El('nav', '', [
      $.Span(PPZ.initData.connection),
      $.Icon('arrow-right2'),
      $.Span(PPZ.initData.database),
      $.Icon('arrow-right2'),
      $.Span(PPZ.initData.table)
    ]),
    $.Div('operations', [
      $.Div('btns', [
        // 通过事件来传达各种状态
        Button('查询', 'light', function() {
        }),
        function() {
          const $el = Button('字段', 'filter', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('新增', 'add', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('删除', 'delete', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('保存', 'save', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('取消', 'return', function() {
          })
          return $el
        }()
      ]),
    ])
  ])
  
  function Button(title, icon, handler) {
    const el = $.Div('', [$.Icon(icon)])
    el.title = title
    el.onclick = handler
    return el
  }
}

const table = new function() {
  const table = new $.Table()
  this.$el = $.Div('table-wrapper', [table.$el])

  $.msg('fields', fields => {
    this.fields = fields
    table.thead([$.El('th', 'pre-unit'), ...fields.map(f => f.name)])
  })

  $.msg('data', data => {
    // 在 webview 里确定先发 fields，后发 data
    this.data = data
    table.tbody(data.map(record => {
      const row = []
      for(const f of this.fields)
        row.push(record[f.name])
      return [$.El('th', 'pre-unit'), ...row]
    }))
  })
}

$('body').append(
  header.$el,
  table.$el
)