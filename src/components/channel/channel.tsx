import React from "react";
import { Card } from '@blueprintjs/core'
import { M3uMedia } from "m3u-parser-generator";

import './channel.scss'

export interface ChannelProp {
  media: M3uMedia;
  style?: React.CSSProperties;
  onClick(media: M3uMedia): void;
}

export const Channel: React.FC<ChannelProp> = (props) => {
  const { media, style, onClick } = props;

  const handleClick = () => {
    onClick(media);
  }

  return (
    <Card className='channel' interactive compact style={style} onClick={handleClick}>
      <div>
        <img src={media.attributes['tvg-logo']} style={{ width: '24px', height: '24px' }}></img>
        <span>{media.name}</span>
      </div>
    </Card>
  )
}
