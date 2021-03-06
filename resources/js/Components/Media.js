import PropTypes from 'prop-types'
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  FunctionField,
  Filter,
  CardActions,
  ListButton,
  CreateButton,
  DeleteButton
  // CloneButton
} from 'react-admin'

import {
  Create,
  Edit,
  SimpleForm,
  AutocompleteInput,
  TextInput,
  FileInput,
  ImageInput,
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

export const MediaFilter = props => (
  <Filter {...props}>
    <TextInput label="文件名" source="file_name" />
  </Filter>
)

const MediaActions = ({
  basePath,
  currentSort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter
}) => (
  <CardActions>
    <CreateButton basePath={basePath} />
  </CardActions>
)

class MediaListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])

    return (
      <List
        {...filterProps}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={50}
        title="素材管理"
        filters={<MediaFilter />}
        actions={<MediaActions />}
      >
        <GridList />
      </List>
    )
  }
}

export const MediaList = connect(false)(MediaListComponent)

const redirect = (basePath, id, data) => {
  return `/pages/${data.reference_id}/3`
}
export class MediaCreateComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    return (
      <Create {...filterProps}>
        <SimpleForm redirect={redirect} encType="multipart/form-data">
          <ReferenceInput label="Page" source="reference_id" reference="pages">
            <SelectInput optionText="admin_title" />
          </ReferenceInput>
          <ImageInput
            source="files"
            label="Related images"
            placeholder={<p>Drop images here</p>}
            accept="image/*"
            multiple
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </Create>
    )
  }
}

export const MediaCreate = connect(undefined)(MediaCreateComponent)

const optionRenderer = choice => {
  return `${choice.admin_title}`
}
const RenderPageTitle = ({ choices }) => {
  return `Page: ${choices[0].admin_title}`
}

const RenderMediaFiles = ({ record }) => {
  return record.files
    ? record.files.map(file => {
        return <img width={400} src={file.src} alt={file.title} />
      })
    : ''
}
// Edit
export class MediaEditComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    return (
      <Edit {...filterProps}>
        <SimpleForm redirect={redirect} encType="multipart/form-data" toolbar={false}>
          <ReferenceInput label="Page" source="reference_id" reference="pages">
            <RenderPageTitle />
          </ReferenceInput>
          <RenderMediaFiles source="files" />
          <DeleteButton />
        </SimpleForm>
      </Edit>
    )
  }
}

export const MediaEdit = connect(undefined)(MediaEditComponent)
