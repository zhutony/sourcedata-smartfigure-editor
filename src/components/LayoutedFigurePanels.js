import { $$ } from 'substance'
import { NodeComponent } from 'substance-texture'
import FigurePanelThumbnail from './FigurePanelThumbnail'
import PanelLayout from './PanelLayout'
import AutoLayout from './AutoLayout'

export default class LayoutedFigurePanels extends NodeComponent {
  constructor (...args) {
    super(...args)

    if (this.props.node.layout) {
      this._layout = this._initializeLayout()
    }
  }

  render () {
    const figure = this.props.node
    if (!figure.layout) {
      return $$(AutoLayout, { node: figure }).addClass('sc-layouted-figure-panels')
    } else {
      const tdEls = []
      const el = $$('div', { class: 'sc-layouted-figure-panels' })
      const table = this._layout.render(tdEls)
      const L = figure.panels.length
      while (tdEls.length < figure.panels.length) {
        this._expandTable(table, tdEls)
      }
      const panels = figure.resolve('panels')
      for (let idx = 0; idx < L; idx++) {
        const tdEl = tdEls[idx]
        const panel = panels[idx]
        tdEl.append(
          $$(FigurePanelThumbnail, { node: panel }).ref(panel.id)
        )
      }
      el.append(table)
      return el
    }
  }

  _onNodeUpdate (change) {
    // Only rerender this when 'panels' have changed, as opposed to other properties such as title
    if (change.hasUpdated([this.props.node.id, 'panels'])) {
      this.rerender()
    }
    if (change.hasUpdated([this.props.node.id, 'layout'])) {
      this._layout = this._initializeLayout()
    }
  }

  _expandTable (table, tdEls) {
    const ncols = this._layout.getNcols()
    const tr = $$('tr')
    for (let idx = 0; idx < ncols; idx++) {
      const tdEl = $$('td')
      tr.append(tdEl)
      tdEls.push(tdEl)
    }
    table.append(tr)
  }

  _initializeLayout () {
    const layoutStr = this.props.node.layout
    const layout = new PanelLayout(layoutStr)
    return layout
  }
}
