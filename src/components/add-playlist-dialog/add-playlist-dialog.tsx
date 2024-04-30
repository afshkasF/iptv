import React, { useState } from 'react'
import { Dialog, DialogBody, DialogFooter } from '@blueprintjs/core'

import { Button } from '../button/button'
import { Label } from '../label/label'
import { TextBox } from '../textbox/textbox'

import './add-playlist-dialog.scss'

export interface AddPlaylistDialogProps {
  isOpen: boolean
  onOk(name: string, url: string): void;
  onCancel(): void
}

export const AddPlaylistDialog: React.FC<AddPlaylistDialogProps> = (props) => {
  const { isOpen, onOk, onCancel } = props

  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const resetState = (): void => {
    setName('')
    setUrl('')
  }

  const handleOkClick = (): void => {
    onOk(name, url)
    resetState()
  }

  const handleCancel =(): void => {
    onCancel()
    resetState()
  }

  return (
    <Dialog className='bp5-dark' isOpen={isOpen} onClose={handleCancel}>
      <DialogBody className='add-playlist-dialog__body'>
        <Label text='Name:' htmlFor='playlist-name' inline/>
        <TextBox
          id='playlist-name'
          value={name}
          placeholder='Publicly available IPTV'
          onChange={setName}
        />
        <Label text='URL:' htmlFor='playlist-url' inline/>
        <TextBox
          id='playlist-url'
          value={url}
          placeholder='https://iptv-org.github.io/iptv/index.m3u'
          onChange={setUrl}
        />
      </DialogBody>
      <DialogFooter actions={
        <>
          <Button intent='primary' onClick={handleOkClick}>Ok</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      }>
      </DialogFooter>
    </Dialog>
  )
}
