const Path = require('path')
const vscode = require('vscode')

class TreeviewElement {
  constructor({
    parent,
    updateEvent,
    name,
    contextValue,
    collapse = vscode.TreeItemCollapsibleState.Collapsed
  }) {
    this.parent = parent
    this.updateEvent = updateEvent || parent.updateEvent
    this.name = name
    this.contextValue = contextValue
    this.collapse = collapse
  }

  getTreeItem() {
    const result = new vscode.TreeItem(this.name, this.collapse)
    if(this.contextValue)
      result.contextValue = this.contextValue
    return result
  }

  async getChildren() {
    if(!this._children) {
      console.debug('getChildren', this.name)
      this._children = await this._getChildren()
    }
    return this._children
  }

  refresh() {
    this._children = null
    this.updateEvent.fire(this)
  }
  
  getIconPath(path) {
    return Path.join(__filename, '../../../../../../assets/icon/', path)
  }
}
exports.TreeviewElement = TreeviewElement

class TableElement extends TreeviewElement {
  constructor(parent, schemaName, tbName, names, connection) {
    super({
      parent,
      name: tbName,
      collapse: vscode.TreeItemCollapsibleState.None
    })
    this.schemaName = schemaName
    this.names = names
    this.connection = connection
  }

  getTreeItem() {
    const result = super.getTreeItem()
    result.iconPath = this.getIconPath('table.svg')
    result.command = {
      command: 'ppz.openTable',
      title: 'Open Table',
      arguments: [this]
    }
    return result
  }
}
exports.TableElement = TableElement