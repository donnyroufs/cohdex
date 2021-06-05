export class DebugUtil {
  private readonly _el: HTMLDivElement

  constructor() {
    this._el = this.createDebugger()
  }

  private createDebugger() {
    const el = document.createElement('div')
    el.style.background = '#181b23'
    el.style.height = '200px'
    el.style.width = '512px'
    el.style.color = 'white'
    el.style.position = 'absolute'
    el.style.top = '32px'
    el.style.right = '32px'
    el.style.zIndex = '9000'
    // el.style.textAlign = 'center'
    el.style.display = 'flex'
    el.style.justifyContent = 'center'
    el.style.alignItems = 'center'
    el.style.fontWeight = 'bold'
    el.style.flexDirection = 'column'

    el.id = 'tmap-debugger'

    document.body.appendChild(el)

    return el
  }

  setText(content: string) {
    this._el.innerHTML = content
  }
}
