import React from 'react'
import PropTypes from 'prop-types'

const PreviewButton = ({ source, record = {} }) => <a href={`/page/${record.path}`} target="_blank">Preview</a>

PreviewButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired
}

export default PreviewButton
