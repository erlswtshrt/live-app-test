import quip from 'quip'

export class RootRecord extends quip.apps.RootRecord {
  static getProperties = () => ({
    canvas: quip.apps.CanvasRecord
  })

  static getDefaultProperties = () => ({
    canvas: {}
  })
}
