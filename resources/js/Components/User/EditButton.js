import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Create'

const EditButton = ({ record = {} }) => (
  <a href={`/admin#/users/${record.id}`} title="Edit">
    <EditIcon />
  </a>
)

EditButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object
}

export default EditButton
