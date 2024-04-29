import React, { useMemo, useState } from 'react'
import { M3uMedia, M3uParser } from 'm3u-parser-generator'

import { PlaylistData } from '$/domain/playlist-data'
import { useLocalStore } from '$/hooks/use-local-store'

import { AddPlaylistDialog } from '../add-playlist-dialog/add-playlist-dialog'
import { Channels } from '../channels/channels'
import { Playlists } from '../playlists/playlists'

import './main-page.scss'

const PLAYLIST_LOCAL_STORE_KEY = 'playlists'

export interface MainPageProps {
  onChannelChange(media: M3uMedia): void
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const { onChannelChange } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData>()
  const [playlistsStr, setPlaylistsStr] = useLocalStore(PLAYLIST_LOCAL_STORE_KEY, '[]')

  const parsedPlaylist = useMemo(() => {
    return selectedPlaylist ? M3uParser.parse(selectedPlaylist.data) : undefined
  }, [selectedPlaylist])

  const playlistsData = useMemo(() => {
    return JSON.parse(playlistsStr) as PlaylistData[]
  }, [playlistsStr])

  const handleAddPlaylistCancel = (): void => {
    setIsOpen(false)
  }

  const handleAddPlaylistOk = (name: string, url: string): void => {
      fetch(url).then((response) => {
        return response.text()
      }).then((data) => {
        setPlaylistsStr(JSON.stringify([...playlistsData, { name, url, data }]))
      })
      setIsOpen(false)
  }

  const handlePlaylistSelect = (data: PlaylistData): void => {
    setSelectedPlaylist(data)
  }

  const handlePlaylistAdd = (): void => {
    setIsOpen(true)
  }

  const handlePlaylistRemove = (playlist: PlaylistData): void => {
    const index = playlistsData.findIndex((p) => p == playlist)
    if (index >= 0) {
      const newPlaylistData = [...playlistsData.slice(0, index), ...playlistsData.slice(index + 1)]
      setPlaylistsStr(JSON.stringify(newPlaylistData))
    }
  }

  return (
    <div className='main-page'>
      <Playlists
        selected={selectedPlaylist}
        playlists={playlistsData}
        onPlaylistSelect={handlePlaylistSelect}
        onPlaylistAdd={handlePlaylistAdd}
        onPlaylistRemove={handlePlaylistRemove}
      />
      <AddPlaylistDialog
        isOpen={isOpen}
        onOk={handleAddPlaylistOk}
        onCancel={handleAddPlaylistCancel}
      />
      <Channels playlist={parsedPlaylist} onChange={onChannelChange}/>
    </div>
  )
}
