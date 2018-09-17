import PropTypes from 'prop-types'
import timeago from 'timeago.js'
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  Filter,
  CardActions,
  ListButton
  // CloneButton
} from 'react-admin'

import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DisabledInput,
  LongTextInput,
  SelectInput,
  DateInput,
  RadioButtonGroupInput,
  BooleanInput,
  ReferenceInput,
  FormTab
} from 'react-admin'

import GridList from './Media/GridList'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import _ from 'lodash'

const timeagoInstance = timeago() // set the relative date here.

class MediaListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this

    return (
      <List {...props} sort={{ field: 'id', order: 'ASC' }} perPage={50}>
        <GridList />
      </List>
    )
  }
}

export const MediaList = connect(state => {
  return {}
})(MediaListComponent)
