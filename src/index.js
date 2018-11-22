import queryString from 'query-string'
import { canEditVideo } from 'lib/actions'
import renderHome from 'pages/renderHome'
import renderPlayer from 'pages/renderPlayer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css'

injectTapEventPlugin()

const params = queryString.parse(window.location.search)
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
