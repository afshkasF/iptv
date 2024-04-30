import React from 'react'
import { M3uPlaylist, M3uMedia } from 'm3u-parser-generator'
import { Grid, GridCellProps } from 'react-virtualized'

import { Channel } from '../channel/channel'

const WIDTH = 800
const HEIGHT = 600
const COLUMNS_COUNT = 5
const COLUMN_WIDTH = WIDTH / COLUMNS_COUNT
const ROW_HEIGHT = 80
const SCROLL_WIDTH = 23

export interface ChannelsProps {
  playlist: M3uPlaylist;
  onChange(media: M3uMedia): void;
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { playlist, onChange } = props;

  const handleClick = (media: M3uMedia): void => {
    onChange?.(media);
  }

  const cellRenderer = (props: GridCellProps) => {
    const index = props.rowIndex * COLUMNS_COUNT + props.columnIndex
    if (index >= playlist.medias.length) {
      return null;
    }
    const media = playlist.medias[index]
    const style = {
      ...props.style,
      width: `calc(${props.style.width}px - 20px)`,
      height: `calc(${props.style.height}px - 20px)`
    }
    return (
      <Channel
        key={props.key}
        media={media}
        style={style}
        onClick={handleClick}
      />
    )
  }

  return (
    <Grid
      width={WIDTH + SCROLL_WIDTH}
      height={HEIGHT}
      columnWidth={COLUMN_WIDTH}
      rowHeight={ROW_HEIGHT}
      columnCount={COLUMNS_COUNT}
      rowCount={playlist.medias.length / COLUMNS_COUNT}
      cellRenderer={cellRenderer}
    />
  )
}
