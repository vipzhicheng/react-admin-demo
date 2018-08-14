import React from 'react'
import { Admin, Resource } from 'react-admin'

// import jsonServerProvider from 'ra-data-json-server'
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

import dataProvider from './dataProvider'
import authProvider from './authProvider'
import { PostList } from './posts'

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    title="活动管理系统"
  >
    <Resource name="posts" list={PostList} />
  </Admin>
)

export default App
