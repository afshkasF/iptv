import React, { useMemo, useState } from 'react'
import { M3uPlaylist, M3uMedia } from 'm3u-parser-generator'
import { Grid, GridCellProps } from 'react-virtualized'
import cn from 'classnames'
import { Icon, InputGroup } from '@blueprintjs/core'

import { useResizeObserver } from '$/hooks/use-resize-observer'

import { Button } from '../button/button'
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

  const [query, setQuery] = useState<string>('')

  const columnsCount = Math.floor((width - SCROLL_WIDTH) / (COLUMN_WIDTH + COLUMNS_GAP_MIN))
  const columnWidth = Math.floor((width - SCROLL_WIDTH) / columnsCount)

  const medias = useMemo(() => {
    if (query == '') {
      return playlist.medias
    }
    return playlist.medias.filter((m) => m.name?.includes(query))
  }, [playlist, query])

  const handleClick = (media: M3uMedia): void => {
    onChange?.(media);
  }

  const cellRenderer = (props: GridCellProps) => {
    const index = props.rowIndex * columnsCount + props.columnIndex
    if (index >= medias.length) {
      return null;
    }
    const media = medias[index]
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
      <InputGroup
        value={query}
        placeholder='Enter channel name'
        rightElement={<Button><Icon icon='search'/></Button>}
        onValueChange={setQuery}
      />
      <div className='channels__grid-container'>
        <div ref={targetRef} className='channels__grid-resizer'>
          {columnsCount > 0 &&
            <Grid
              width={width}
              height={height}
              columnWidth={columnWidth}
              rowHeight={ROW_HEIGHT}
              columnCount={columnsCount}
              rowCount={Math.ceil(medias.length / columnsCount)}
              cellRenderer={cellRenderer}
            />
          }
        </div>
      </div>
    </div>
  )
}
