import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { M3uMedia, M3uParser } from 'm3u-parser-generator'
import { nanoid } from 'nanoid'

import { ROUTES } from '$/consts/routes'
import { QUERY_PARAMETERS } from '$/consts/query-parameters'
import { PlaylistData } from '$/domain/playlist-data'
import { useQuery } from '$/hooks/use-query'

import { AddPlaylistDialog } from '../add-playlist-dialog/add-playlist-dialog'
import { Channels } from '../channels/channels'
import { Playlists } from '../playlists/playlists'

import './main-page.scss'

export interface MainPageProps {
  playlists: PlaylistData[]
  onPlaylistAdd(playlist: PlaylistData): void
  onPlaylistRemove(playlist: PlaylistData): void
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const { playlists, onPlaylistAdd, onPlaylistRemove } = props

  const navigate = useNavigate()

  const playlistId = useQuery(QUERY_PARAMETERS.PLAYLIST_ID)

  const selectedPlaylist = useMemo(() => {
    return playlists.find((p) => p.id == playlistId)
  }, [playlists, playlistId])

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const parsedPlaylist = useMemo(() => {
    return selectedPlaylist ? M3uParser.parse(selectedPlaylist.data) : undefined
  }, [selectedPlaylist])

  const handleAddPlaylistCancel = (): void => {
    setIsOpen(false)
  }

  const handleAddPlaylistOk = (name: string, url: string): void => {
      fetch(url).then((response) => {
        return response.text()
      }).then((data) => {
        const id = nanoid()
        const newPlaylistData: PlaylistData = { id, name, url, data }
        onPlaylistAdd(newPlaylistData)
      })
      setIsOpen(false)
  }

  const handlePlaylistSelect = (playlist: PlaylistData): void => {
    const url = new URL(window.location.origin)
    url.pathname = ROUTES.MAIN
    url.searchParams.set(QUERY_PARAMETERS.PLAYLIST_ID, playlist.id)
    navigate(url.toString().substring(url.origin.length))
  }

  const handlePlaylistAdd = (): void => {
    setIsOpen(true)
  }

  const handleChannelChange = (media: M3uMedia): void => {
    const playlistId = selectedPlaylist?.id
    const channelId = media.attributes['tvg-id']
    if (!playlistId || !channelId) {
      return;
    }
    const url = new URL(window.location.origin)
    url.pathname = ROUTES.PLAYER
    url.searchParams.set(QUERY_PARAMETERS.PLAYLIST_ID, playlistId)
    url.searchParams.set(QUERY_PARAMETERS.CHANNEL_ID, channelId)
    navigate(url.toString().substring(url.origin.length))
  }

  return (
    <div className='main-page'>
      <Playlists
        selected={selectedPlaylist}
        playlists={playlists}
        onPlaylistSelect={handlePlaylistSelect}
        onPlaylistAdd={handlePlaylistAdd}
        onPlaylistRemove={onPlaylistRemove}
      />
      <AddPlaylistDialog
        isOpen={isOpen}
        onOk={handleAddPlaylistOk}
        onCancel={handleAddPlaylistCancel}
      />
      <Channels playlist={parsedPlaylist} onChange={handleChannelChange}/>
    </div>
  )
}
