import React from 'react'
import { Admin, Resource } from 'react-admin'

import jsonServerProvider from 'ra-data-json-server'
const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

// import dataProvider from './dataProvider'
import { PostList } from './posts'

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} />
  </Admin>
)

export default App
