import React from 'react'
import PropTypes from 'prop-types'
import EditorIcon from '@material-ui/icons/Settings'

export { default as PageIcon } from '@material-ui/icons/Book'

const EditorButton = ({ record = {} }) => (
  <a href={`/page/${record.id}/edit`} target="_blank" title="Preview">
    <EditorIcon />
  </a>
)

EditorButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object
}

export default EditorButton
