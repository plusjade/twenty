import qs from 'qs'
import { canEditVideo } from 'lib/actions'
import renderHome from 'pages/renderHome'
import renderPlayer from 'pages/renderPlayer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css'

injectTapEventPlugin()

const params = qs.parse(window.location.search.substring(1))
const videoId = params.id
const canEdit = !!params.edit && canEditVideo(videoId)
const isEmbed = !!params.embed
const isDebug = !!params.debug

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
