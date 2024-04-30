import React from 'react'
import { M3uPlaylist, M3uMedia } from 'm3u-parser-generator'
import { Grid, GridCellProps } from 'react-virtualized'

import { useResizeObserver } from '$/hooks/use-resize-observer'

import { Channel } from '../channel/channel'

import './channels.scss'

const COLUMN_WIDTH_MIN = 200
const ROW_HEIGHT = 80
const SCROLL_WIDTH = 23

export interface ChannelsProps {
  playlist: M3uPlaylist;
  onChange(media: M3uMedia): void;
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { playlist, onChange } = props;

  const { ref: targetRef, width, height } = useResizeObserver<HTMLDivElement>()

  const handleClick = (media: M3uMedia): void => {
    onChange?.(media);
  }

  const columnsCount = Math.floor(width / COLUMN_WIDTH_MIN)
  const columnWidth = (width - SCROLL_WIDTH) / columnsCount

  const cellRenderer = (props: GridCellProps) => {
    const index = props.rowIndex * columnsCount + props.columnIndex
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
    <div className='channels'>
      <div ref={targetRef} className='channels__grid-container'>
        <Grid
          width={width}
          height={height}
          columnWidth={columnWidth}
          rowHeight={ROW_HEIGHT}
          columnCount={columnsCount}
          rowCount={playlist.medias.length / columnsCount}
          cellRenderer={cellRenderer}
        />
      </div>
    </div>
  )
}
