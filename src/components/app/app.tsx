import React, { useEffect, useState } from 'react'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr'
import { M3uMedia, M3uParser, M3uPlaylist } from 'm3u-parser-generator'

import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'

import { Button } from '../button/button'
import { TextBox } from '../textbox/textbox'
import { Channels } from '../channels/channels'

export interface AppProps {
}

export const App: React.FC<AppProps> = () => {
  const [url, setUrl] = useState<string>('')
  const [src, setSrc] = useState<string>()
  const [playlist, setPlaylist] = useState<M3uPlaylist>()
  const [fetchUrl, setFetchUrl] = useState<string>('')

  const handleFetchClick = (): void => {
    setFetchUrl(url)
  }

  const handleChannelChange = (media: M3uMedia): void => {
    setSrc(media.location)
  }

  useEffect(() => {
    if (fetchUrl != '') {
      fetch(fetchUrl).then((response) => {
        return response.text()
      }).then((text) => {
        const playlist = M3uParser.parse(text)
        setPlaylist(playlist)
      })
    }
  }, [fetchUrl]);

  return (
    <React.Fragment>
      <TextBox value={url} onChange={setUrl}></TextBox>
      <Button onClick={handleFetchClick}>Fetch</Button>
      <Channels playlist={playlist} onChange={handleChannelChange}></Channels>
      <MediaPlayer src={src}>
        <MediaProvider />
        <PlyrLayout icons={plyrLayoutIcons} />
      </MediaPlayer>
    </React.Fragment>
  )
}
