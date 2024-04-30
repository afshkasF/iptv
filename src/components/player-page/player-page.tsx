import React, { useMemo } from 'react'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr'
import { M3uParser } from 'm3u-parser-generator'

import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'

import { QUERY_PARAMETERS } from '$/consts/query-parameters'
import { PlaylistData } from '$/domain/playlist-data'
import { useQuery } from '$/hooks/use-query'

export interface PlayerPageProps {
  playlists: PlaylistData[]
}

export const PlayerPage: React.FC<PlayerPageProps> = (props) => {
  const { playlists } = props

  const playlistId = useQuery(QUERY_PARAMETERS.PLAYLIST_ID)
  const channelId = useQuery(QUERY_PARAMETERS.CHANNEL_ID)

  const media = useMemo(() => {
    const playlist = playlists.find((p) => p.id == playlistId)
    const parsedPlaylist = playlist && M3uParser.parse(playlist.data)
    const media = parsedPlaylist?.medias.find((m) => m.attributes['tvg-id'] == channelId)
    return media
  }, [playlists, playlistId, channelId])

  return (
    <div className='player-page'>
      <MediaPlayer src={media?.location}>
        <MediaProvider />
        <PlyrLayout icons={plyrLayoutIcons} />
      </MediaPlayer>
    </div>
  )
}
