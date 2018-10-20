import React from 'react'
import { Button } from 'react-admin'
import PropTypes from 'prop-types'
import EditorIcon from '@material-ui/icons/Palette'

const EditorButton = ({ record = {}, label }) => {
  return label ? (
    <a href={`/page/${record.id}/edit`} target="_blank" title="Editor">
      <Button label={label} />
    </a>
  ) : (
    <a href={`/page/${record.id}/edit`} target="_blank" title="Editor">
      <EditorIcon />
    </a>
  )
}

EditorButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object
}

export default EditorButton
