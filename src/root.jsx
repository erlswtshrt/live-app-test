import quip from 'quip'
import App from './app.jsx'

import { RootRecord } from './model'

quip.apps.registerClass(RootRecord, 'root')

quip.apps.initialize({
  toolbarCommandIds: [],
  initializationCallback: function (rootNode, params) {
    ReactDOM.render(<App />, rootNode)
  }
})
