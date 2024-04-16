import React, { useState } from 'react'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';

import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

import { Button } from '../button/button';
import { TextBox } from '../textbox/textbox';

export interface AppProps {
}

export const App: React.FC<AppProps> = () => {
  const [url, setUrl] = useState<string>('')
  const [src, setSrc] = useState<string>()

  const handlePlayClick = (): void => {
    setSrc(url);
  }

  return (
    <React.Fragment>
      <TextBox value={url} onChange={setUrl}></TextBox>
      <Button onClick={handlePlayClick}>Play</Button>
      <MediaPlayer src={src}>
        <MediaProvider />
        <PlyrLayout icons={plyrLayoutIcons} />
      </MediaPlayer>
    </React.Fragment>
  )
}
