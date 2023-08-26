import { EventEmitter, window, TreeItemCollapsibleState, TreeItem } from 'vscode'
import key from '@/common/constant/key'
import { State_list, Connection_config } from '@/main/state/oo'
import { Element, Has_item, Has_children } from './oo'

// https://code.visualstudio.com/api/extension-guides/tree-view

export
function init_connection_view(state: State_list<Connection_config>) {
  const event_emitter = new EventEmitter<Element>()
  window.createTreeView<Element>(key.view.id.connection, {
    // https://code.visualstudio.com/api/references/vscode-api#TreeViewOptions
    showCollapseAll: true,
    treeDataProvider: {
      // https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
      onDidChangeTreeData: event_emitter.event,
      getChildren: (el: Has_children = make_root(state)) =>
        el.get_children()
      ,
      getTreeItem: (el: Has_item) =>
        el.get_item()
    }
  })
  return event_emitter
}

function make_root(state: State_list<Connection_config>) {
  const default_collapse = TreeItemCollapsibleState.Collapsed
  return {
    get_children() {
      return state.get().map(config => make_connection(config))
    }
  }

  function make_connection(config: Connection_config) {
    return {
      get_children() {
        return []
      },
      get_item() {
        const item = new TreeItem(config.name)
        return item
      }
    }
  }
}
