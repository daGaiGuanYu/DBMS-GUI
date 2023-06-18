import Webview from './common/form-base'
import service from '../service/connection'
import vscode from 'vscode'

export default
class UpsertConnectionWebview extends Webview {
  constructor(record) {
    super({
      filename: 'upsert-connection',
      title: record ? vscode.l10n.t('updateConnection') : vscode.l10n.t('newConnection'),
      initData: { record }
    })
  }

  async upsert(data) {
    console.debug('upserting connection', data.record)
    await service.upsert(data)
  }
}