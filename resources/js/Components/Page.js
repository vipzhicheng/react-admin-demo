import timeago from 'timeago.js'
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  EditButton,
  CloneButton
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
  RadioButtonGroupInput
} from 'react-admin'

import RichTextInput from 'ra-input-rich-text'

export { default as PageIcon } from '@material-ui/icons/Book'

import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import CustomizableDatagrid from 'ra-customizable-datagrid'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_OPTIONS_REQUEST } from '../Actions/Options'
import PreviewButton from './Common/PreviewButton'

const timeagoInstance = timeago() // set the relative date here.

class PageListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // const { dispatch } = this.props
    // dispatch({ type: FETCH_OPTIONS_REQUEST })
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS } = props.apiOptions
    return (
      <List
        {...filterProps}
        sort={{ field: 'created_at', order: 'DESC' }}
        title="页面管理"
      >
        <CustomizableDatagrid
          defaultColumns={[
            'id',
            'admin_title',
            'path',
            'type',
            'status',
            'created_at'
          ]}
        >
          <TextField source="id" label="活动ID" />
          <TextField source="admin_title" label="活动名称" />
          <FunctionField
            source="path"
            label="活动路径"
            render={record => `/page/${record.path}`}
          />
          <FunctionField
            source="type"
            label="活动类型"
            render={record => PAGE_TYPE_OPTIONS[record.type]}
          />
          <FunctionField
            source="status"
            label="活动状态"
            render={record => PAGE_STATUS_OPTIONS[record.status]}
          />
          <FunctionField
            source="start_time"
            label="活动开始时间"
            render={record => (
              <Tooltip title={record.start_time} placement="right-end">
                <span>
                  {timeagoInstance.format(record.start_time, 'zh_CN')}
                </span>
              </Tooltip>
            )}
          />
          <FunctionField
            source="end_time"
            label="活动结束时间"
            render={record => (
              <Tooltip title={record.end_time} placement="right-end">
                <span>{timeagoInstance.format(record.end_time, 'zh_CN')}</span>
              </Tooltip>
            )}
          />
          <FunctionField
            source="created_at"
            label="活动创建时间"
            render={record => (
              <Tooltip title={record.created_at} placement="right-end">
                <span>
                  {timeagoInstance.format(record.created_at, 'zh_CN')}
                </span>
              </Tooltip>
            )}
          />
          <FunctionField
            source="updated_at"
            label="最后更新时间"
            render={record => (
              <Tooltip title={record.updated_at} placement="right-end">
                <span>
                  {timeagoInstance.format(record.updated_at, 'zh_CN')}
                </span>
              </Tooltip>
            )}
          />
          <PreviewButton />
          <EditButton />
          <CloneButton />
        </CustomizableDatagrid>
      </List>
    )
  }
}

export const PageList = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(PageListComponent)

const PageTitle = ({ record }) => {
  return <span>Post {record ? `"${record.admin_title}"` : ''}</span>
}

export class PageEditComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this

    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS } = props.apiOptions
    const pageTypeChoices = []
    Object.keys(PAGE_TYPE_OPTIONS).map(key => {
      pageTypeChoices.push({
        id: key,
        name: PAGE_TYPE_OPTIONS[key]
      })
    })

    const pageStatusChoices = []
    Object.keys(PAGE_STATUS_OPTIONS).map(key => {
      pageStatusChoices.push({
        id: key,
        name: PAGE_STATUS_OPTIONS[key]
      })
    })

    return (
      <Edit title={<PageTitle />} {...filterProps}>
        <SimpleForm>
          <DisabledInput source="id" />
          <TextInput source="admin_title" isRequired />
          <TextInput source="path" />
          <SelectInput source="type" choices={pageTypeChoices} value="1" />
          <TextInput source="title" />
          <LongTextInput source="keywords" />
          <LongTextInput source="description" />
          <DateInput source="start_time" />
          <DateInput source="end_time" />

          <RadioButtonGroupInput source="status" choices={pageStatusChoices} />
        </SimpleForm>
      </Edit>
    )
  }
}

export const PageEdit = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(PageEditComponent)

export class PageCreateComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS } = props.apiOptions

    const pageTypeChoices = []
    Object.keys(PAGE_TYPE_OPTIONS).map(key => {
      pageTypeChoices.push({
        id: key,
        name: PAGE_TYPE_OPTIONS[key]
      })
    })

    const pageStatusChoices = []
    Object.keys(PAGE_STATUS_OPTIONS).map(key => {
      pageStatusChoices.push({
        id: key,
        name: PAGE_STATUS_OPTIONS[key]
      })
    })

    return (
      <Create {...filterProps}>
        <SimpleForm>
          <TextInput source="admin_title" isRequired={true} />
          <TextInput source="path" />
          <SelectInput source="type" choices={pageTypeChoices} />
          <TextInput source="title" />
          <LongTextInput source="keywords" />
          <LongTextInput source="description" />
          <DateInput source="start_time" />
          <DateInput source="end_time" />
          <RadioButtonGroupInput source="status" choices={pageStatusChoices} />
        </SimpleForm>
      </Create>
    )
  }
}

export const PageCreate = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(PageCreateComponent)
