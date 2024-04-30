import React from "react";
import { Card, Icon } from '@blueprintjs/core'
import { M3uMedia } from "m3u-parser-generator";

import './channel.scss'

export interface ChannelProp {
  media: M3uMedia;
  selected?: boolean
  style?: React.CSSProperties;
  onClick(media: M3uMedia): void;
}

export const Channel: React.FC<ChannelProp> = (props) => {
  const { media, selected, style, onClick } = props;

  const logoSrc = media.attributes['tvg-logo']

  const handleClick = () => {
    onClick(media);
  }

  return (
    <Card
      className='channel'
      interactive
      compact
      selected={selected}
      style={style}
      onClick={handleClick}
    >
      {logoSrc &&
        <img className='channel__logo' src={logoSrc}></img> ||
        <Icon icon='help' size={64}/>
      }
      <div className='channel__name'>{media.name}</div>
    </Card>
  )
}
