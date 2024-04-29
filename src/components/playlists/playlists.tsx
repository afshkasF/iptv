import React from "react";
import { Card, CardList, Icon } from '@blueprintjs/core'

import { PlaylistData } from '$/domain/playlist-data'

import { Playlist } from '../playlist/playlist'

import './playlists.scss'

export interface PlaylistsProps {
  selected?: PlaylistData
  playlists: PlaylistData[]
  onPlaylistSelect(playlist: PlaylistData): void
  onPlaylistAdd(): void
  onPlaylistRemove(playlist: PlaylistData): void
}

export const Playlists: React.FC<PlaylistsProps> = (props) => {
  const { playlists, selected, onPlaylistSelect, onPlaylistAdd, onPlaylistRemove } = props

  return (
    <CardList bordered={false}>
      {playlists.map((playlist) => {
        return (
          <Playlist
            key={playlist.url}
            playlist={playlist}
            selected={!!selected && selected == playlist}
            onClick={onPlaylistSelect}
            onRemove={onPlaylistRemove}
          />
        )
      })}
      <Card className='playlists__add-card' interactive onClick={onPlaylistAdd}>
        <Icon icon='plus'/>
      </Card>
    </CardList>
  )
}
