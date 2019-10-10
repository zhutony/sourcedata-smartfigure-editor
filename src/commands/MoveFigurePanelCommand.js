import BasicFigurePanelCommand from './_BasicFigurePanelCommand'

export class MoveFigurePanelCommand extends BasicFigurePanelCommand {
  getCommandState (params, context) {
    const direction = this.config.direction
    const commandState = super.getCommandState(params, context)
    if (!commandState.disabled) {
      const doc = context.editorSession.getDocument()
      const panel = doc.get(commandState.currentPanelId)
      const pos = panel.getPosition()
      if (direction === 'up' && pos === 0) {
        commandState.disabled = true
      } else if (direction === 'down') {
        const L = panel.getParent().panels.length
        if (pos === L - 1) {
          commandState.disabled = true
        }
      }
    }
    return commandState
  }

  execute (params, context) {
    const direction = this.config.direction
    const commandState = params.commandState
    context.api.movePanel(commandState.currentPanelId, direction)
  }
}
