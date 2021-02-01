import quip from 'quip'

export default class App extends React.Component {
  clickHandler(e) {
    this.canvasNode.addCommentAtPoint(e.clientX, e.clientY)
  }

  render() {
    return (
      <div
        style={{ width: 600, height: 600, background: 'yellow' }}
        onClick={this.clickHandler.bind(this)}
      >
        <quip.apps.ui.Canvas
          ref={node => (this.canvasNode = node)}
          record={quip.apps.getRootRecord().get('canvas')}
        ></quip.apps.ui.Canvas>
      </div>
    )
  }
}
