import React from 'react'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr'

import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'

export interface PlayerPageProps {
  src?: string;
}

export const PlayerPage: React.FC<PlayerPageProps> = (props) => {
  const { src } = props

  return (
    <div>
      <MediaPlayer src={src}>
        <MediaProvider />
        <PlyrLayout icons={plyrLayoutIcons} />
      </MediaPlayer>
    </div>
  )
}
