import React from "react";
import { Card, Icon } from '@blueprintjs/core'

import { PlaylistData } from '$/domain/playlist-data'
import { Button } from '../button/button'

import './playlist.scss'

export interface PlaylistProps {
  playlist: PlaylistData
  selected: boolean
  onClick(playlist: PlaylistData): void
  onRemove(playlist: PlaylistData): void
}

export const Playlist: React.FC<PlaylistProps> = (props) => {
  const { playlist, selected, onClick, onRemove } = props

  const handleClick = (): void => {
    onClick(playlist)
  }

  const handleRemoveClick = (): void => {
    onRemove(playlist)
  }

  return <Card className='playlist' interactive selected={selected} onClick={handleClick}>
    {playlist.name}
    <Button onClick={handleRemoveClick}><Icon icon='trash'/></Button>
  </Card>
}
