import BasicFigurePanelCommand from './_BasicFigurePanelCommand'

export default class RemoveFigurePanelCommand extends BasicFigurePanelCommand {
  execute (params, context) {
    const { currentItemId } = params.commandState
    const editor = context.editorSession.getRootComponent()
    if (editor) {
      context.api.removeAndDeleteNode(currentItemId)
    }
  }
}
