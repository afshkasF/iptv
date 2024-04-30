import React, { useMemo, useState } from 'react'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr'
import { M3uParser } from 'm3u-parser-generator'
import { DialogBody, Drawer, Icon } from '@blueprintjs/core'

import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'

import { QUERY_PARAMETERS } from '$/consts/query-parameters'
import { PlaylistData } from '$/domain/playlist-data'
import { useQuery } from '$/hooks/use-query'

import { Button } from '../button/button'
import { Channels } from '../channels/channels'

import './player-page.scss'

export interface PlayerPageProps {
  playlists: PlaylistData[]
}

export const PlayerPage: React.FC<PlayerPageProps> = (props) => {
  const { playlists } = props

  const playlistId = useQuery(QUERY_PARAMETERS.PLAYLIST_ID)
  const channelId = useQuery(QUERY_PARAMETERS.CHANNEL_ID)

  const [channelsIsOpen, setChannelsIsOpen] = useState<boolean>(false)

  const playlist = useMemo(() => {
    const playlist = playlists.find((p) => p.id == playlistId)
    return playlist && M3uParser.parse(playlist.data)
  }, [playlists, playlistId])

  const media = useMemo(() => {
    const media = playlist?.medias.find((m) => m.attributes['tvg-id'] == channelId)
    return media
  }, [playlist, playlistId, channelId])

  const handleToggleChannelsIsOpen = (): void => {
    setChannelsIsOpen(!channelsIsOpen)
  }

  const handleChannelChange = (): void => {
  }

  const channelsElement =
    playlist && <Channels
      className='player-page__channels'
      playlist={playlist}
      selected={media}
      onChange={handleChannelChange}
    />

  return (
    <div className='player-page'>
      <MediaPlayer className='player-page__player' src={media?.location}>
        <MediaProvider />
        <PlyrLayout icons={plyrLayoutIcons} />
      </MediaPlayer>
      <Button className='player-page__channels-button' onClick={handleToggleChannelsIsOpen}>
        <Icon icon='double-chevron-left'/>
      </Button>
      <Drawer
        className='bp5-dark'
        isOpen={channelsIsOpen}
        onClose={handleToggleChannelsIsOpen}
      >
        {channelsIsOpen && channelsElement}
      </Drawer>
      {!channelsIsOpen && channelsElement}
    </div>
  )
}
