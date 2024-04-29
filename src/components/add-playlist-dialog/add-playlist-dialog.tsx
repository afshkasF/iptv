import React, { useState } from 'react'
import { Dialog, DialogBody, DialogFooter } from '@blueprintjs/core'

import { Button } from '../button/button'
import { Label } from '../label/label'
import { TextBox } from '../textbox/textbox'

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
      <DialogBody>
        <Label text='Name:' inline>
          <TextBox value={name} onChange={setName}></TextBox>
        </Label>
        <Label text='URL:' inline>
          <TextBox value={url} onChange={setUrl}></TextBox>
        </Label>
      </DialogBody>
      <DialogFooter actions={
        <>
          <Button onClick={handleOkClick}>Ok</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      }>
      </DialogFooter>
    </Dialog>
  )
}
