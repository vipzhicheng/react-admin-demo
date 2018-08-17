import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

export const PageList = props => (
  <List {...props} sort={{ order: 'ASC' }}>
    <Datagrid>
      <TextField source="id" label="活动ID"/>
      <TextField source="admin_title" label="活动名称" />
      <TextField source="type" label="活动类型" />
      <TextField source="created_at" label="创建时间" />
      <TextField source="updated_at" label="更新时间" />
    </Datagrid>
  </List>
)
