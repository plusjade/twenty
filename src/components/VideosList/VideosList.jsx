import React, { PureComponent }   from 'react'
import QueryParams from 'lib/QueryParams'
import { token, remove } from 'lib/actions'
import EditorButton from 'components/EditorButton/EditorButton'

import style                from './Style'

const QParams = QueryParams()

const getVideos = () => (
  Object.keys(window.localStorage)
    .filter(key => key.startsWith('video_'))
    .map(videoId => ({
      token: videoId.replace('video_', ''),
      created_at: ""
    }))
)

class VideosList extends PureComponent {
   handleCreateNew = (e) => {
    e.preventDefault()
    window.location = `/?id=${token()}&edit=1`
  }

  render() {
    return (
      <div style={style.wrap}>
        {getVideos().map((v, i) => (
          <div
            key={i}
            style={{position: "relative"}}
          >
            <a
              style={style.video}
              href={`/?id=${v.token}`}
            >
              <span>{v.created_at}</span>
              <br/>
              <span>{` ${v.token} `}</span>
            </a>

            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
              <EditorButton
                onTap={() => {
                  window.location = `/?id=${v.token}&edit=1`
                }}
                dark
              >
                <div>{"✍"}</div>
              </EditorButton>
              <EditorButton
                onTap={() => {
                  if (window.confirm(`delete '${v.token}' video forever?`)) {
                    remove(v.token)
                    window.location.reload()
                  }
                }}
                dark
              >
                <div>{"X"}</div>
              </EditorButton>
            </div>
          </div>
        ))}
        <a
          style={style.video}
          href={'#new'}
          onClick={this.handleCreateNew}
        >
          <span>{'create new'}</span>
        </a>
      </div>
    )
  }
}

export default VideosList
