import React from 'react'
import PropTypes from 'prop-types'
import PreviewIcon from '@material-ui/icons/LocalParking'

export { default as PageIcon } from '@material-ui/icons/Book'

const PreviewButton = ({ record = {} }) => (
  <a href={`/page/${record.path}`} target="_blank" title="Preview">
    <PreviewIcon />
  </a>
)

PreviewButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object
}

export default PreviewButton
