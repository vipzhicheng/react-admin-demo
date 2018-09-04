import React from 'react'
import { Button, Link } from 'react-admin'
import ContentClone from '@material-ui/icons/Forward'

const CloneButton = ({ record = {}, ...rest }) => (
  <Button
    component={Link}
    to={{
      pathname: '/templates/create',
      state: {
        record: Object.assign({}, record, {
          name: `Clone of ${record.name}`,
          status: '0'
        })
      }
    }}
    label="Clone"
    {...rest}
  >
    <ContentClone />
  </Button>
)

export default CloneButton
