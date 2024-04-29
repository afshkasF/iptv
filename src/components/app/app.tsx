import React, { useState } from 'react'

import { MainPage } from '../main-page/main-page'
import { PlayerPage } from '../player-page/player-page'
import { M3uMedia } from 'm3u-parser-generator'

const MAIN_PAGE = 'main'
const PLAYER_PAGE = 'player'

export interface AppProps {
}

export const App: React.FC<AppProps> = () => {
  const [page, setPage] = useState<string>(MAIN_PAGE)
  const [playerSrc, setPlayerSrc] = useState<string>()

  const handleChannelChange = (media: M3uMedia): void => {
    setPage(PLAYER_PAGE)
    setPlayerSrc(media.location)
  }

  return (
    <React.Fragment>
      {page == MAIN_PAGE && <MainPage onChannelChange={handleChannelChange}/>}
      {page == PLAYER_PAGE && <PlayerPage src={playerSrc}/>}
    </React.Fragment>
  )
}
