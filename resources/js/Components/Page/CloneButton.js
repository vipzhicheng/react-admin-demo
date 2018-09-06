import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import CloneIcon from '@material-ui/icons/PhotoLibrary'

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    paddingRight: '5px'
  }
})

const EditButton = ({ record = {}, classes }) => (
  <Link
    to={{
      pathname: '/pages/create',
      state: {
        record: Object.assign({}, record, {
          admin_title: `Clone of ${record.admin_title}`,
          status: '0'
        })
      }
    }}
    className={classNames(classes.link)}
    title="Clone"
  >
    <CloneIcon />
  </Link>
)

EditButton.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object
}

export default withStyles(styles)(EditButton)
