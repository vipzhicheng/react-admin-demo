import React from 'react'
import { Button } from 'react-admin'
import PropTypes from 'prop-types'
import PreviewIcon from '@material-ui/icons/Visibility'

export { default as PageIcon } from '@material-ui/icons/Book'

const PreviewButton = ({ record = {}, label }) => {
  return label ? (
    <a href={`/page/${record.slug}`} target="_blank" title="Preview">
      <Button label={label} />
    </a>
  ) : (
    <a href={`/page/${record.slug}`} target="_blank" title="Preview">
      <PreviewIcon />
    </a>
  )
}

PreviewButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object
}

export default PreviewButton
