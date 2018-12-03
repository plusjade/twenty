import qs from 'qs'
import { canEditVideo } from 'lib/actions'
import renderHome from 'pages/renderHome'
import renderPlayer from 'pages/renderPlayer'
import './index.css'

const params = qs.parse(window.location.search.substring(1))
const videoId = params.id
const canEdit = !!params.edit && canEditVideo(videoId)
const isEmbed = !!params.embed
const isDebug = !!params.debug
const isTest = !!params.test

if (videoId) {
  renderPlayer({
    videoId,
    canEdit,
    isEmbed,
    isDebug,
    isTest,
  })
} else {
  renderHome()
}
