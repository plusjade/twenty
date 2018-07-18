import QueryParams from 'lib/QueryParams'
import { canEditVideo } from 'lib/actions'
import renderHome from 'home'
import renderPlayer from 'player'

import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const QParams = QueryParams()
const videoId = QParams.get('id')
const canEdit = !!QParams.get('edit') && canEditVideo(videoId)
const isEmbed = !!QParams.get('embed')
const isDebug = !!QParams.get('debug')

if (videoId) {
  renderPlayer({
    videoId,
    canEdit,
    isEmbed,
    isDebug
  })
} else {
  renderHome()
}
