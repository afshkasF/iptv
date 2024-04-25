import React from 'react'
import { M3uPlaylist, M3uMedia } from 'm3u-parser-generator'

import { Channel } from '../channel/channel'

import './channels.scss'

export interface ChannelsProps {
  playlist?: M3uPlaylist;
  onChange?(media: M3uMedia): void;
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { playlist, onChange } = props;

  const handleClick = (media: M3uMedia): void => {
    onChange?.(media);
  }

  return (
    <div className='channels'>
      {playlist && playlist.medias.slice(140, 150).map((media) => {
        return <Channel key={media.location} media={media} onClick={handleClick}></Channel>
      })}
    </div>
  )
}
