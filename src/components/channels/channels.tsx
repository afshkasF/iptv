import React from 'react'
import { M3uPlaylist, M3uMedia } from 'm3u-parser-generator'
import { Grid, GridCellProps } from 'react-virtualized'
import cn from 'classnames'

import { useResizeObserver } from '$/hooks/use-resize-observer'

import { Channel } from '../channel/channel'

import './channels.scss'

const COLUMN_WIDTH = 200
const COLUMNS_GAP_MIN = 20
const ROW_HEIGHT = 150
const SCROLL_WIDTH = 23

export interface ChannelsProps {
  className?: string
  playlist: M3uPlaylist;
  selected?: M3uMedia;
  onChange(media: M3uMedia): void;
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { className, playlist, selected, onChange } = props;

  const { ref: targetRef, width, height } = useResizeObserver<HTMLDivElement>()

  const handleClick = (media: M3uMedia): void => {
    onChange?.(media);
  }

  const columnsCount = Math.floor((width - SCROLL_WIDTH) / (COLUMN_WIDTH + COLUMNS_GAP_MIN))

  const columnWidth = (width - SCROLL_WIDTH) / columnsCount

  const cellRenderer = (props: GridCellProps) => {
    const index = props.rowIndex * columnsCount + props.columnIndex
    if (index >= playlist.medias.length) {
      return null;
    }
    const media = playlist.medias[index]
    const horizontalMargin = Math.floor((columnWidth - COLUMN_WIDTH) / 2)
    const style = {
      ...props.style,
      width: COLUMN_WIDTH,
      height: `calc(${props.style.height}px - 20px)`,
      marginLeft: `${horizontalMargin}px`,
      marginRight: `${horizontalMargin}px`,
    }
    return (
      <Channel
        key={props.key}
        media={media}
        selected={media == selected}
        style={style}
        onClick={handleClick}
      />
    )
  }

  return (
    <div className={cn('channels', className)}>
      <div ref={targetRef} className='channels__grid-container'>
        {columnsCount > 0 &&
          <Grid
            width={width}
            height={height}
            columnWidth={columnWidth}
            rowHeight={ROW_HEIGHT}
            columnCount={columnsCount}
            rowCount={playlist.medias.length / columnsCount}
            cellRenderer={cellRenderer}
          />
        }
      </div>
    </div>
  )
}
