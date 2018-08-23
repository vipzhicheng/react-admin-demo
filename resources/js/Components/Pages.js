import React from 'react'
import { List, Datagrid, TextField, FunctionField } from 'react-admin'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_OPTIONS_REQUEST } from '../Actions/Options'

class PageList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({ type: FETCH_OPTIONS_REQUEST })
  }

  render() {
    const { props } = this
    const filterProps = _.omit(_.omitBy(props, _.isFunction), ['apiOptions'])
    const { PAGE_TYPE_OPTIONS } = props.apiOptions
    return (
      <List {...filterProps} sort={{ order: 'ASC' }}>
        <Datagrid>
          <TextField source="id" label="活动ID" />
          <TextField source="admin_title" label="活动名称" />
          <FunctionField
            label="活动类型"
            render={record => PAGE_TYPE_OPTIONS[record.type]}
          />
          <TextField source="created_at" label="创建时间" />
          <TextField source="updated_at" label="更新时间" />
        </Datagrid>
      </List>
    )
  }
}

export default connect(state => {
  return {
    apiOptions: state.apiOptions
  }
})(PageList)
