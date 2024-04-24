import React from "react";
import { M3uMedia } from "m3u-parser-generator";

export interface ChannelProp {
  media: M3uMedia;
  onClick(media: M3uMedia): void;
}

export const Channel: React.FC<ChannelProp> = (props) => {
  const { media, onClick } = props;

  const handleClick = () => {
    onClick(media);
  }

  return (
    <li onClick={handleClick}>{media.location}</li>
  )
}
