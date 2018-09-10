import PropTypes from 'prop-types'
import timeago from 'timeago.js'
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  Filter
  // CloneButton
} from 'react-admin'

import { TextInput } from 'react-admin'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_OPTIONS_REQUEST } from '../Actions/Options'
import EditButton from './User/EditButton'

const timeagoInstance = timeago() // set the relative date here.

class UserFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(props, ['userStatusChoices'])

    return (
      <Filter {...filterProps}>
        <TextInput label="用户名称" source="username" defaultValue="" resettable />
      </Filter>
    )
  }
}

UserFilter.propTypes = {}

class UserListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch, apiOptions } = this.props
    dispatch({ type: FETCH_OPTIONS_REQUEST })
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { USER_STATUS_OPTIONS } = props.apiOptions

    const userStatusChoices = []
    if (USER_STATUS_OPTIONS) {
      Object.keys(USER_STATUS_OPTIONS).map(key => {
        userStatusChoices.push({
          id: key,
          name: USER_STATUS_OPTIONS[key]
        })
      })
    }

    return (
      <List {...filterProps} sort={{ field: 'updated_at', order: 'DESC' }} title="页面管理" filters={<UserFilter />}>
        <Datagrid>
          <TextField source="id" label="用户ID" />
          <TextField source="username" label="用户名称" />
          <FunctionField source="status" label="用户状态" render={record => USER_STATUS_OPTIONS[record.status]} />
          <FunctionField
            source="created_at"
            label="用户创建时间"
            render={record => (
              <Tooltip title={record.created_at} placement="right-end">
                <span>{timeagoInstance.format(record.created_at, 'zh_CN')}</span>
              </Tooltip>
            )}
          />
          <FunctionField
            source="updated_at"
            label="最后更新时间"
            render={record => (
              <Tooltip title={record.updated_at} placement="right-end">
                <span>{timeagoInstance.format(record.updated_at, 'zh_CN')}</span>
              </Tooltip>
            )}
          />
          <EditButton label="" />
        </Datagrid>
      </List>
    )
  }
}

export const UserList = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(UserListComponent)
