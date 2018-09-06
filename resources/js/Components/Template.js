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
  TabbedForm,
  FormTab
} from 'react-admin'

import RichTextInput from 'ra-input-rich-text'

export { default as TemplateIcon } from '@material-ui/icons/Dashboard'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import CustomizableDatagrid from 'ra-customizable-datagrid'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_OPTIONS_REQUEST } from '../Actions/Options'
import PreviewButton from './Template/PreviewButton'
import EditorButton from './Template/EditorButton'
import EditButton from './Template/EditButton'
import CloneButton from './Template/CloneButton'

const timeagoInstance = timeago() // set the relative date here.

const styles = {
  rowCell: {
    padding: '0 3px'
  }
}

class TemplateFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(props, ['templateStatusChoices'])
    const { templateStatusChoices } = props

    return (
      <Filter {...filterProps}>
        <TextInput label="模板名称" source="name" defaultValue="" resettable />
        <SelectInput label="模板状态" source="status" choices={templateStatusChoices} />
      </Filter>
    )
  }
}

TemplateFilter.propTypes = {
  templateStatusChoices: PropTypes.array.isRequired
}

class TemplateListComponent extends React.Component {
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
    const { TEMPLATE_STATUS_OPTIONS } = props.apiOptions
    const templateStatusChoices = []
    Object.keys(TEMPLATE_STATUS_OPTIONS).map(key => {
      templateStatusChoices.push({
        id: key,
        name: TEMPLATE_STATUS_OPTIONS[key]
      })
    })

    return (
      <List
        {...filterProps}
        sort={{ field: 'updated_at', order: 'DESC' }}
        title="模板管理"
        filters={<TemplateFilter templateStatusChoices={templateStatusChoices} />}
      >
        <Datagrid classes={{ rowCell: props.classes.rowCell }}>
          <TextField source="id" label="模板ID" />
          <TextField source="name" label="模板名称" />
          <FunctionField source="status" label="模板状态" render={record => TEMPLATE_STATUS_OPTIONS[record.status]} />
          <FunctionField
            source="created_at"
            label="模板创建时间"
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
          <EditButton />
          <CloneButton />
        </Datagrid>
      </List>
    )
  }
}

export const TemplateList = withStyles(styles)(
  connect(state => {
    return {
      apiOptions: state.apiOptions
    }
  })(TemplateListComponent)
)

const TemplateTitle = ({ record }) => {
  return <span>Template {record ? `"${record.name}"` : ''}</span>
}

export class TemplateEditComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this

    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { TEMPLATE_STATUS_OPTIONS } = props.apiOptions

    const templateStatusChoices = []
    Object.keys(TEMPLATE_STATUS_OPTIONS).map(key => {
      templateStatusChoices.push({
        id: key,
        name: TEMPLATE_STATUS_OPTIONS[key]
      })
    })

    return (
      <Edit title={<TemplateTitle />} {...filterProps}>
        <SimpleForm redirect="list">
          <DisabledInput source="id" />
          <TextInput source="name" isRequired />
          <RadioButtonGroupInput source="status" choices={templateStatusChoices} />
        </SimpleForm>
      </Edit>
    )
  }
}

export const TemplateEdit = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(TemplateEditComponent)

const redirect = (basePath, id, data) => {
  return '/templates'
}
export class TemplateCreateComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { TEMPLATE_STATUS_OPTIONS } = props.apiOptions

    const templateStatusChoices = []
    Object.keys(TEMPLATE_STATUS_OPTIONS).map(key => {
      templateStatusChoices.push({
        id: key,
        name: TEMPLATE_STATUS_OPTIONS[key]
      })
    })

    return (
      <Create {...filterProps}>
        <SimpleForm redirect={redirect}>
          <TextInput source="name" isRequired={true} />
          <RadioButtonGroupInput source="status" choices={templateStatusChoices} />
        </SimpleForm>
      </Create>
    )
  }
}

export const TemplateCreate = connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(TemplateCreateComponent)
