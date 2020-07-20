import PropTypes from 'prop-types'
import { format } from 'timeago.js'
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
  SelectInput,
  DateInput,
  RadioButtonGroupInput,
  BooleanInput,
  ReferenceInput,
  FormTab
} from 'react-admin'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_OPTIONS_REQUEST } from '../Actions/Options'
import EditButton from './User/EditButton'

class UserFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(props, ['userStatusChoices'])

    return (
      <Filter {...filterProps}>
        <TextInput label="用户名称" source="username" defaultValue="" resettable alwaysOn />
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
      <List
        {...filterProps}
        sort={{ field: 'id', order: 'ASC' }}
        title="用户管理"
        filters={<UserFilter />}
        bulkActions={false}
      >
        <Datagrid>
          <TextField source="id" label="用户ID" />
          <TextField source="username" label="用户名称" />
          <FunctionField source="status" label="用户状态" render={record => USER_STATUS_OPTIONS[record.status]} />
          <FunctionField
            source="created_at"
            label="用户创建时间"
            render={record => (
              <Tooltip title={record.created_at} placement="right-end">
                <span>{format(record.created_at, 'zh_CN')}</span>
              </Tooltip>
            )}
          />
          <FunctionField
            source="updated_at"
            label="最后更新时间"
            render={record => (
              <Tooltip title={record.updated_at} placement="right-end">
                <span>{format(record.updated_at, 'zh_CN')}</span>
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

const UserEditActions = ({ basePath, data, resource }) => (
  <CardActions>
    <ListButton basePath="/users" />
  </CardActions>
)
const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.username}"` : ''}</span>
}

export class UserEditComponent extends React.Component {
  constructor(props) {
    super(props)
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
      <Edit title={<UserTitle />} {...filterProps}>
        <SimpleForm redirect="list">
          <TextInput disabled source="id" />
          <TextInput disabled source="username" />
          <TextInput source="email" type="email" isRequired={true} />
          <TextInput source="password" type="password" isRequired={true} />
          <RadioButtonGroupInput source="status" choices={userStatusChoices} />
        </SimpleForm>
      </Edit>
    )
  }
}

export const UserEdit = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(UserEditComponent)

const redirect = (basePath, id, data) => {
  return '/users'
}
export class UserCreateComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { USER_STATUS_OPTIONS } = props.apiOptions

    const userStatusChoices = []
    Object.keys(USER_STATUS_OPTIONS).map(key => {
      userStatusChoices.push({
        id: key,
        name: USER_STATUS_OPTIONS[key]
      })
    })

    return (
      <Create {...filterProps}>
        <SimpleForm redirect={redirect}>
          <TextInput source="username" isRequired={true} />
          <TextInput source="email" type="email" isRequired={true} />
          <TextInput source="password" type="password" isRequired={true} />
          <RadioButtonGroupInput source="status" choices={userStatusChoices} />
        </SimpleForm>
      </Create>
    )
  }
}

export const UserCreate = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(UserCreateComponent)
