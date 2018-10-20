import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import timeago from 'timeago.js'
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  Filter,
  ReferenceManyField,
  CreateButton,
  DeleteButton,
  RefreshButton,
  ListButton,
  CloneButton as CloneButtonOrigin,
  CardActions
  // CloneButton
} from 'react-admin'
import GridList from './Media/GridList'

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
  TabbedForm,
  FormTab
} from 'react-admin'

import RichTextInput from 'ra-input-rich-text'

export { default as PageIcon } from '@material-ui/icons/Description'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

import CustomizableDatagrid from 'ra-customizable-datagrid'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_OPTIONS_REQUEST } from '../Actions/Options'
import PreviewButton from './Page/PreviewButton'
import EditorButton from './Page/EditorButton'
import CloneButton from './Page/CloneButton'
import EditButton from './Page/EditButton'

const timeagoInstance = timeago() // set the relative date here.

class PageFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(props, ['pageTypeChoices', 'pageStatusChoices'])
    const { pageTypeChoices, pageStatusChoices } = props

    return (
      <Filter {...filterProps}>
        <TextInput label="活动名称" source="admin_title" defaultValue="" resettable />
        <SelectInput label="活动类型" source="type" choices={pageTypeChoices} />
        <SelectInput label="活动状态" source="status" choices={pageStatusChoices} />
      </Filter>
    )
  }
}

PageFilter.propTypes = {
  pageTypeChoices: PropTypes.array.isRequired,
  pageStatusChoices: PropTypes.array.isRequired
}

const styles = {}
class PageListComponent extends React.Component {
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
    const { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS } = props.apiOptions

    const pageTypeChoices = []
    if (PAGE_TYPE_OPTIONS) {
      Object.keys(PAGE_TYPE_OPTIONS).map(key => {
        pageTypeChoices.push({
          id: key,
          name: PAGE_TYPE_OPTIONS[key]
        })
      })
    }

    const pageStatusChoices = []
    if (PAGE_STATUS_OPTIONS) {
      Object.keys(PAGE_STATUS_OPTIONS).map(key => {
        pageStatusChoices.push({
          id: key,
          name: PAGE_STATUS_OPTIONS[key]
        })
      })
    }

    return (
      <List
        {...filterProps}
        sort={{ field: 'id', order: 'DESC' }}
        title="页面管理"
        filters={<PageFilter pageTypeChoices={pageTypeChoices} pageStatusChoices={pageStatusChoices} />}
      >
        <CustomizableDatagrid defaultColumns={['id', 'admin_title', 'type', 'status', 'created_at', 'updated_at']}>
          <TextField source="id" label="活动ID" />
          <TextField source="admin_title" label="活动名称" />
          <FunctionField source="type" label="活动类型" render={record => PAGE_TYPE_OPTIONS[record.type]} />
          <FunctionField source="status" label="活动状态" render={record => PAGE_STATUS_OPTIONS[record.status]} />
          <FunctionField
            source="start_time"
            label="活动开始时间"
            render={record => (
              <Tooltip title={record.start_time} placement="right-end">
                <span>{timeagoInstance.format(record.start_time, 'zh_CN')}</span>
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
          <PreviewButton />
          <EditorButton />
          <EditButton label="" />
          <CloneButton />
        </CustomizableDatagrid>
      </List>
    )
  }
}

export const PageList = withStyles(styles)(
  connect(state => {
    return {
      apiOptions: state.apiOptions
    }
  })(PageListComponent)
)

const PageTitle = ({ record }) => {
  return <span>Page {record ? `"${record.admin_title}"` : ''}</span>
}

const PageEditActions = ({ basePath, data, resource }) => (
  <CardActions>
    <PreviewButton basePath={basePath} record={data} label="Preview" />
    <EditorButton basePath={basePath} record={data} label="Editor" />
  </CardActions>
)

const PageEditMediaActions = ({ basePath, data, resource }) => (
  <CardActions>
    <CreateButton />
  </CardActions>
)

export class PageEditComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this

    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS } = props.apiOptions
    const pageTypeChoices = []
    if (PAGE_TYPE_OPTIONS) {
      Object.keys(PAGE_TYPE_OPTIONS).map(key => {
        pageTypeChoices.push({
          id: key,
          name: PAGE_TYPE_OPTIONS[key]
        })
      })
    }

    const pageStatusChoices = []
    if (PAGE_STATUS_OPTIONS) {
      Object.keys(PAGE_STATUS_OPTIONS).map(key => {
        pageStatusChoices.push({
          id: key,
          name: PAGE_STATUS_OPTIONS[key]
        })
      })
    }

    const { classes } = props

    return (
      <Edit actions={<PageEditActions />} title={<PageTitle />} {...filterProps}>
        <TabbedForm redirect="list">
          <FormTab label="基本信息">
            <DisabledInput source="id" />
            <TextInput source="admin_title" isRequired />
            <TextInput source="path" />
            <DisabledInput source="slug" />
            <SelectInput source="type" choices={pageTypeChoices} />
            <ReferenceInput label="Template" source="template_id" reference="pages" filter={{ is_template: 1 }}>
              <SelectInput optionText="admin_title" />
            </ReferenceInput>
            <DateInput source="start_time" />
            <DateInput source="end_time" />
            <BooleanInput source="is_template" />
            <RadioButtonGroupInput source="status" choices={pageStatusChoices} />
          </FormTab>
          <FormTab label="SEO">
            <TextInput source="title" />
            <LongTextInput source="keywords" />
            <LongTextInput source="description" />
          </FormTab>
          <FormTab label="开关">
            <BooleanInput source="enable_meiqia" />
            <BooleanInput source="enable_sensor_analytics" />
            <BooleanInput source="enable_baidu_analytics" />
            <BooleanInput source="enable_growingio_analytics" />
            <BooleanInput source="enable_cps" />
          </FormTab>
          <FormTab label="素材">
            <ReferenceManyField
              addLabel={false}
              reference="media"
              target="reference_id"
              sort={{ field: 'created_at', order: 'DESC' }}
              filter={{ reference_type: 'page' }}
              perPage={50}
            >
              <GridList classes={{ root: classes.root }} />
            </ReferenceManyField>
          </FormTab>
        </TabbedForm>
      </Edit>
    )
  }
}

const editStyles = {
  root: {
    marginTop: '1em'
  }
}
const enhance = compose(withStyles(editStyles))

export const PageEdit = enhance(
  connect(state => {
    return {
      apiOptions: state.apiOptions
    }
  })(PageEditComponent)
)

const redirect = (basePath, id, data) => {
  return '/pages'
}
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
        <TabbedForm redirect={redirect}>
          <FormTab label="基本信息">
            <TextInput source="admin_title" isRequired={true} />
            <TextInput source="path" />
            <SelectInput source="type" choices={pageTypeChoices} />
            <ReferenceInput label="Template" source="template_id" reference="pages" filter={{ is_template: 1 }}>
              <SelectInput optionText="admin_title" />
            </ReferenceInput>
            <DateInput source="start_time" />
            <DateInput source="end_time" />
            <BooleanInput source="is_template" />
            <RadioButtonGroupInput source="status" choices={pageStatusChoices} />
          </FormTab>
          <FormTab label="SEO">
            <TextInput source="title" />
            <LongTextInput source="keywords" />
            <LongTextInput source="description" />
          </FormTab>
          <FormTab label="开关">
            <BooleanInput source="enable_meiqia" />
            <BooleanInput source="enable_sensor_analytics" />
            <BooleanInput source="enable_baidu_analytics" />
            <BooleanInput source="enable_growingio_analytics" />
            <BooleanInput source="enable_cps" />
          </FormTab>
        </TabbedForm>
      </Create>
    )
  }
}

export const PageCreate = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(PageCreateComponent)
