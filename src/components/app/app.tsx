import React, { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { M3uMedia } from 'm3u-parser-generator'

import { PlaylistData } from '$/domain/playlist-data'
import { useLocalStore } from '$/hooks/use-local-store'

import { MainPage } from '../main-page/main-page'
import { PlayerPage } from '../player-page/player-page'
import { ROUTES } from '../../consts/routes'

const PLAYLIST_LOCAL_STORE_KEY = 'playlists'

export interface AppProps {
}

export const App: React.FC<AppProps> = () => {
  const [playlistsStr, setPlaylistsStr] = useLocalStore(PLAYLIST_LOCAL_STORE_KEY, '[]')

  const playlists = useMemo(() => {
    return JSON.parse(playlistsStr) as PlaylistData[]
  }, [playlistsStr])

  const handlePlaylistAdd = (playlist: PlaylistData): void => {
    setPlaylistsStr(JSON.stringify([...playlists, playlist]))
  }

  const handlePlaylistRemove = (playlist: PlaylistData): void => {
    const index = playlists.indexOf(playlist)
    if (index >= 0) {
      const newPlaylistData = [...playlists.slice(0, index), ...playlists.slice(index + 1)]
      setPlaylistsStr(JSON.stringify(newPlaylistData))
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={
          <MainPage
            playlists={playlists}
            onPlaylistAdd={handlePlaylistAdd}
            onPlaylistRemove={handlePlaylistRemove}
          />
        }/>
        <Route path={ROUTES.PLAYER} element={
          <PlayerPage playlists={playlists}/>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
