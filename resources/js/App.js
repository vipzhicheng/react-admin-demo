import React from 'react'
import { Admin, Resource } from 'react-admin'

// import jsonServerProvider from 'ra-data-json-server'
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

import dataProvider from './Providers/DataProvider'
import authProvider from './Providers/AuthProvider'
import { PostList } from './Resources/Posts'
import { PageList } from './Resources/Pages'

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    title="活动管理系统"
  >
  <Resource name="pages" list={PageList} options={{ label: '页面' }} />
  <Resource name="posts" list={PostList} options={{ label: '文章' }} />
  </Admin>
)

export default App
